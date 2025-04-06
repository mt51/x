import React from 'react';

import Welcome from '../../src/welcome';
import mountTest from '../shared/mountTest';
import rtlTest from '../shared/rtlTest';

describe('welcome', () => {
  mountTest(() => <Welcome />);
  rtlTest(() => <Welcome />);
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });
});
