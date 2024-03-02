import { useEffect, useRef } from 'react';

import { useIsomorphicLayoutEffect } from '.';

export const useTimeout = (callback: () => void, delay: number | null): void => {
  const savedCallback = useRef(callback);

  useIsomorphicLayoutEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    // if delay is not specified, do not set timeout
    // 0 is a valid value
    if (!delay && delay !== 0) return;

    const id = setTimeout(() => savedCallback.current(), delay);

    return () => {
      clearTimeout(id);
    };
  }, [delay]);
};
