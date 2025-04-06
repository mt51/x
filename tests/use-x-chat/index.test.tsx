/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { fireEvent, render, renderHook, waitFakeTimer } from '../utils';
import useXAgent, { RequestFn } from '../../src/use-x-agent';
import useXChat, {
  MessageStatus,
  SimpleType,
  XChatConfig,
} from '../../src/use-x-chat';

describe('useXChat', () => {
  const requestNeverEnd = jest.fn(() => {});

  beforeAll(() => {
    requestNeverEnd.mockClear();
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  function Demo<Message extends SimpleType = string>({
    request,
    ...config
  }: Partial<XChatConfig<Message>> & {
    request?: RequestFn<Message>;
  }) {
    const [agent] = useXAgent<Message>({
      request: request || requestNeverEnd,
    });

    const { parsedMessages, onRequest } = useXChat<Message>({
      agent,
      ...config,
    });

    return (
      <>
        <pre>{JSON.stringify(parsedMessages)}</pre>
        <input
          onChange={(e) => {
            onRequest(e.target.value as Message);
          }}
        />
      </>
    );
  }

  function getMessages(container: HTMLElement) {
    return JSON.parse(container.querySelector('pre')!.textContent!);
  }

  function expectMessage<T = string>(message: T, status?: MessageStatus) {
    const obj: any = { message };
    if (status) {
      obj.status = status;
    }
    return expect.objectContaining(obj);
  }

  it('defaultMessages', () => {
    const { container } = render(
      <Demo
        defaultMessages={[
          {
            message: 'default',
          },
        ]}
      />,
    );

    expect(getMessages(container)).toEqual([
      {
        id: 'default_0',
        message: 'default',
        status: 'local',
      },
    ]);
  });

  describe('requestPlaceholder', () => {
    it('static', () => {
      const { container } = render(<Demo requestPlaceholder="bamboo" />);

      fireEvent.change(container.querySelector('input')!, {
        target: { value: 'little' },
      });

      expect(requestNeverEnd).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'little',
          messages: ['little'],
        }),
        expect.anything(),
      );

      expect(getMessages(container)).toEqual([
        expectMessage('little', 'local'),
        expectMessage('bamboo', 'loading'),
      ]);
    });

    it('callback', () => {
      const requestPlaceholder = jest.fn(() => 'light');
      const { container } = render(
        <Demo
          request={requestNeverEnd}
          requestPlaceholder={requestPlaceholder}
        />,
      );

      fireEvent.change(container.querySelector('input')!, {
        target: { value: 'little' },
      });

      expect(requestNeverEnd).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'little',
          messages: ['little'],
        }),
        expect.anything(),
      );
      expect(requestPlaceholder).toHaveBeenCalledWith('little', {
        messages: ['little'],
      });

      expect(getMessages(container)).toEqual([
        expectMessage('little', 'local'),
        expectMessage('light', 'loading'),
      ]);
    });
  });

  describe('requestFallback', () => {
    const requestFailed = jest.fn(async (_, { onError }) => {
      setTimeout(() => {
        onError(new Error('failed'));
      }, 100);
    });

    it('static', async () => {
      const { container } = render(
        <Demo request={requestFailed} requestFallback="bamboo" />,
      );

      fireEvent.change(container.querySelector('input')!, {
        target: { value: 'little' },
      });

      await waitFakeTimer();

      expect(getMessages(container)).toEqual([
        expectMessage('little', 'local'),
        expectMessage('bamboo', 'error'),
      ]);
    });

    it('callback', async () => {
      const requestFallback = jest.fn(async () => 'light');
      const { container } = render(
        <Demo request={requestFailed} requestFallback={requestFallback} />,
      );

      fireEvent.change(container.querySelector('input')!, {
        target: { value: 'little' },
      });

      await waitFakeTimer();

      expect(requestFallback).toHaveBeenCalledWith('little', {
        error: new Error('failed'),
        messages: ['little'],
      });

      expect(getMessages(container)).toEqual([
        expectMessage('little', 'local'),
        expectMessage('light', 'error'),
      ]);
    });

    it('without fallback', async () => {
      const request = jest.fn((_, { onUpdate, onError }) => {
        onUpdate('bamboo');

        setTimeout(() => {
          onError(new Error('error'));
        }, 100);
      });
      const { container } = render(<Demo request={request} />);

      fireEvent.change(container.querySelector('input')!, {
        target: { value: 'little' },
      });
      expect(getMessages(container)).toEqual([
        expectMessage('little', 'local'),
        expectMessage('bamboo', 'loading'),
      ]);

      await waitFakeTimer();
      expect(getMessages(container)).toEqual([
        expectMessage('little', 'local'),
      ]);
    });
  });

  it('parser return multiple messages', async () => {
    const { container } = render(
      <Demo parser={(msg) => [`0_${msg}`, `1_${msg}`]} />,
    );

    fireEvent.change(container.querySelector('input')!, {
      target: { value: 'light' },
    });
    await waitFakeTimer();

    console.log(container.innerHTML);

    expect(getMessages(container)).toEqual([
      expectMessage('0_light', 'local'),
      expectMessage('1_light', 'local'),
    ]);
  });

  it('update to success', async () => {
    const request = jest.fn((_, { onUpdate, onSuccess }) => {
      onUpdate('bamboo');

      setTimeout(() => {
        onSuccess('light');
      }, 100);
    });
    const { container } = render(<Demo request={request} />);

    fireEvent.change(container.querySelector('input')!, {
      target: { value: 'little' },
    });
    expect(getMessages(container)).toEqual([
      expectMessage('little', 'local'),
      expectMessage('bamboo', 'loading'),
    ]);

    await waitFakeTimer();
    expect(getMessages(container)).toEqual([
      expectMessage('little', 'local'),
      expectMessage('light', 'success'),
    ]);
  });

  it('should throw an error if onRequest is called without an agent', () => {
    const { result } = renderHook(() =>
      useXChat({
        defaultMessages: [{ message: 'Hello' }],
      }),
    );

    expect(() => result.current?.onRequest('Hello')).toThrow(
      'The agent parameter is required when using the onRequest method in an agent generated by useXAgent.',
    );
  });
});
