import { expect, it } from 'vitest';

import { TestData } from '../test-typescript';

// Input is tuple type
export const printTest = <Input>(
  params: TestData<Input>,
  fn: (input: Input) => unknown,
  afterExpect?: (res: ReturnType<typeof expect<unknown>>, output: unknown) => void,
) => {
  const { input, output, description } = params;
  it(`
  Input: ${JSON.stringify(input, null, 1)},
  Expected: ${JSON.stringify(output, null, 1)},
  ${description ? `Description: ${description}` : ''}
  `, () => {
    const res = expect(fn(input));
    if (afterExpect) {
      afterExpect(res, output);
    } else {
      res.toStrictEqual(output);
    }
  });
};
