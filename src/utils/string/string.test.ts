import { A, D } from '@mobily/ts-belt';
import { match } from 'ts-pattern';
import { describe } from 'vitest';

import { data } from './string.data';
import { printTest } from '../ignore/test-utility';

import * as util from '.';

describe('test string utility', () => {
  D.mapWithKey(util, (fnName) => {
    match(fnName)
      .with('attachSlashAtFirst', (name) => {
        const fnData = data[name];
        const fn = util.attachSlashAtFirst;
        describe(`test ${name}`, () => {
          A.forEach(fnData, (data) => {
            printTest(data, (input) => {
              return fn(...input);
            });
          });
        });
      })
      .with('replaceSlash', (name) => {
        const fnData = data[name];
        const fn = util.replaceSlash;
        describe(`test ${name}`, () => {
          A.forEach(fnData, (data) => {
            printTest(data, (input) => {
              return fn(...input);
            });
          });
        });
      })
      .exhaustive();
  });
});
