import { CommonUtilTestData, StrictlyReturnEveryUtilTestData } from '../test-typescript';

import * as util from '.';

type UtilType = typeof util;

// @TODO: make autogen-template cli
const delay: CommonUtilTestData<UtilType['delay']> = [
  {
    input: [500],
    output: Promise.resolve(),
  },
  {
    input: [5000],
    output: Promise.resolve(),
  },
];

export const data = {
  delay,
} satisfies StrictlyReturnEveryUtilTestData<UtilType>;
