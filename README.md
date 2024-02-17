# get-effects

Simply utility for directly fetching use-effect mock calls based on their prerequisites.

## Utilities

### `getEffect` - React useEffect hook testing utility method.
Simple utility for grabbing useEffect calls based on a list of prerequisite values.

#### Usage
```js
import React from 'react';
import { getEffects } from '@edx/get-effects';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useEffect: jest.fn(),
}));

const useMyHook = ({ val0, val1, method1 }) => {
  useEffect(() => {
    method1(val0);
  }, []);
  useEffect(() => {
    method1(val1);
  }, [val1, method1]);
};

describe('useMyHook', () => {
  describe('behavior', () => {
    const val0 = 'initial-value';
    const val1 = 'test-value';
    const method1 = jest.fn();
    beforeEach(() => { jest.clearAllMocks(); });
    it('calls method1 with val0 on initial load', () => {
      useMyHook({ val0, val1, method1 });
      const cb = getEffect([], React)[0];
      cb();
      expect(method1).toHaveBeenCalledWith(val0);
    });
    it('calls method1 with val1 when either changes', () => {
      useMyHook({ val0, val1, method1 });
      const cb = getEffect([val1, method1], React)[0];
      cb();
      expect(method1).toHaveBeenCalledWith(val1);
    });
  });
});
```
