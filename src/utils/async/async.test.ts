import { A, D } from '@mobily/ts-belt';
import { match } from 'ts-pattern';
import { describe } from 'vitest';

import { data } from './async.data';
import { printTest } from '../ignore/test-utility';

import * as util from '.';

describe('test async utility', () => {
  D.mapWithKey(util, (fnName) => {
    match(fnName)
      .with('delay', (name) => {
        const fnData = data[name];
        const fn = util.delay;
        describe(`test ${name}`, () => {
          A.forEach(fnData, (data) => {
            printTest(data, (input) => {
              return fn(...input);
            });
          });
        });
      })
      .otherwise(() => null);
  });
});
