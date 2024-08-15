import { describe, expect, it, vi } from 'vitest';

import { log, logWith } from '.';

describe('log and logWith functions', () => {
  // console.log를 가로채기 위한 mock 설정
  vi.spyOn(console, 'log');

  it('log should print and return the data', () => {
    const testData = 'test';
    const result = log(testData);
    expect(console.log).toHaveBeenCalledWith(testData);
    expect(result).toBe(testData);
  });

  it('logWith should call the provided function with data and return the data', () => {
    const mockFn = vi.fn();
    const testData = 'test';
    const logWithData = logWith(mockFn);
    const result = logWithData(testData);
    expect(mockFn).toHaveBeenCalledWith(testData);
    expect(result).toBe(testData);
  });
});
