import { CommonUtilTestData, StrictlyReturnEveryUtilTestData } from '../test-typescript';

import * as util from '.';

type UtilType = typeof util;

// @TODO: make autogen-template cli
const replaceSlash: CommonUtilTestData<UtilType['replaceSlash']> = [
  {
    input: ['/test'],
    output: 'test',
  },
  {
    input: ['/test/test'],
    output: 'test/test',
  },
  {
    input: ['test'],
    output: 'test',
  },
  {
    input: [''],
    output: '',
  },
  {
    input: ['/'],
    output: '',
  },
];

const attachSlashAtFirst: CommonUtilTestData<UtilType['attachSlashAtFirst']> = [
  {
    input: ['test'],
    output: '/test',
  },
  {
    input: ['test/test'],
    output: '/test/test',
  },
  {
    input: [''],
    output: '/',
  },
];

export const data = {
  replaceSlash,
  attachSlashAtFirst,
} satisfies StrictlyReturnEveryUtilTestData<UtilType>;
