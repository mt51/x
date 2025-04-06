import React from 'react';
import { Bubble, XProvider, type XProviderProps } from '../../src';

import mountTest from '../shared/mountTest';
import rtlTest from '../shared/rtlTest';
import { render } from '../utils';

const xProviderProps: XProviderProps = {
  bubble: {
    className: 'test-bubble',
  },
  conversations: {
    className: 'test-conversations',
  },
  prompts: {
    className: 'test-prompts',
  },
  sender: {
    className: 'test-sender',
  },
  suggestion: {
    className: 'test-suggestion',
  },
  thoughtChain: {
    className: 'test-thoughtChain',
  },
};

describe('XProvider Component', () => {
  mountTest(() => <XProvider {...xProviderProps} />);

  rtlTest(() => <XProvider {...xProviderProps} />);

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('bubble.className', () => {
    const { container } = render(
      <XProvider {...xProviderProps}>
        <Bubble content="test" />
      </XProvider>,
    );
    const element = container.querySelector('.test-bubble');
    expect(element).toBeTruthy();
  });
});
