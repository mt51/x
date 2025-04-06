import React from 'react';
import mountTest from '../shared/mountTest';
import rtlTest from '../shared/rtlTest';
import { fireEvent, render, screen } from '@testing-library/react';
import Suggestion, { type SuggestionProps } from '../../src/suggestion';

describe('Sender Component', () => {
  mountTest(() => <Suggestion items={[]} />);

  rtlTest(() => <Suggestion items={[]} />);

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  const MockSuggestion = (props: SuggestionProps) => (
    <Suggestion {...props}>
      {({ onTrigger, onKeyDown }) => (
        <input
          onKeyDown={(e) => {
            if (e.key === '/') {
              onTrigger();
            } else if (e.key === 'Delete') {
              onTrigger(false);
            }
            onKeyDown(e);
          }}
        />
      )}
    </Suggestion>
  );

  it('should display Suggestion when trigger character is typed', () => {
    const items = [
      { label: 'Suggestion 1', value: 'suggestion1' },
      { label: 'Suggestion 2', value: 'suggestion2' },
    ];
    const { container } = render(<MockSuggestion items={items} />);

    fireEvent.keyDown(container.querySelector('input')!, { key: '/' });

    expect(screen.getByText('Suggestion 1')).toBeInTheDocument();
    expect(screen.getByText('Suggestion 2')).toBeInTheDocument();
  });

  it('trigger onSelect', () => {
    const onSelect = jest.fn();
    const items = [{ label: 'Suggestion 1', value: 'suggestion1' }];
    const { container } = render(
      <MockSuggestion items={items} onSelect={onSelect} />,
    );

    fireEvent.keyDown(container.querySelector('input')!, { key: '/' });

    const suggestionItem = screen.getByText('Suggestion 1');
    fireEvent.click(suggestionItem);

    expect(onSelect).toHaveBeenCalledWith('suggestion1');
  });

  it('onTrigger support false to close', () => {
    const onOpenChange = jest.fn();
    const items = [
      {
        label: 'Suggestion 1',
        value: 'suggestion1',
        icon: <div className="bamboo" />,
      },
    ];
    const { container } = render(
      <MockSuggestion items={items} onOpenChange={onOpenChange} />,
    );

    // Open
    fireEvent.keyDown(container.querySelector('input')!, { key: '/' });
    expect(onOpenChange).toHaveBeenCalledWith(true);

    // Close
    onOpenChange.mockReset();
    fireEvent.keyDown(container.querySelector('input')!, { key: 'Delete' });
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it('open controlled', () => {
    const items = [
      {
        label: 'Suggestion 1',
        value: 'suggestion1',
        icon: <div className="bamboo" />,
      },
    ];
    render(<MockSuggestion items={items} open />);

    expect(document.querySelector('.bamboo')).toBeTruthy();
  });

  describe('arrow', () => {
    it('select', () => {
      const onSelect = jest.fn();
      const items = [
        { label: 'Suggestion 1', value: 'suggestion1' },
        {
          label: 'Suggestion 2',
          value: 'suggestion2',
          children: [{ label: 'Suggestion 3', value: 'suggestion3' }],
        },
      ];
      const { container } = render(
        <MockSuggestion items={items} onSelect={onSelect} />,
      );

      fireEvent.keyDown(container.querySelector('input')!, { key: '/' });

      fireEvent.keyDown(container.querySelector('input')!, {
        key: 'ArrowDown',
      });
      fireEvent.keyDown(container.querySelector('input')!, {
        key: 'ArrowRight',
      });
      fireEvent.keyDown(container.querySelector('input')!, { key: 'Enter' });

      expect(onSelect).toHaveBeenCalledWith('suggestion3');
    });

    it('cancel', () => {
      const onOpenChange = jest.fn();
      const items = [
        { label: 'Suggestion 1', value: 'suggestion1' },
        {
          label: 'Suggestion 2',
          value: 'suggestion2',
          children: [{ label: 'Suggestion 3', value: 'suggestion3' }],
        },
      ];
      const { container } = render(
        <MockSuggestion items={items} onOpenChange={onOpenChange} />,
      );

      fireEvent.keyDown(container.querySelector('input')!, { key: '/' });
      expect(onOpenChange).toHaveBeenCalledWith(true);

      fireEvent.keyDown(container.querySelector('input')!, { key: 'ArrowUp' });
      fireEvent.keyDown(container.querySelector('input')!, {
        key: 'ArrowRight',
      });
      fireEvent.keyDown(container.querySelector('input')!, {
        key: 'ArrowLeft',
      });

      // Only one .ant-cascader-menu-item-active
      expect(
        document.querySelectorAll('.ant-cascader-menu-item-active'),
      ).toHaveLength(1);
      expect(
        document.querySelector('.ant-cascader-menu-item-active')!.textContent,
      ).toBe('Suggestion 2');
      expect(document.querySelector('.ant-select-dropdown-hidden')).toBeFalsy();

      onOpenChange.mockReset();
      fireEvent.keyDown(container.querySelector('input')!, { key: 'Escape' });
      expect(onOpenChange).toHaveBeenCalledWith(false);
    });
  });
});
