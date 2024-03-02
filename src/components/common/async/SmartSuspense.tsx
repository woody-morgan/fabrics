import { FC, Suspense, useCallback, useEffect, useRef, useState } from 'react';

import { PromiseThrower } from './util';

const FallbackDelayer: FC<{
  fallback: React.ReactNode;
  fallbackDelayMs: number;
  onShowFallback: () => void;
}> = ({ fallback, fallbackDelayMs = 0, onShowFallback }) => {
  const [showFallback, setShowFallback] = useState(false);

  useEffect(() => {
    if (fallbackDelayMs) {
      const timeoutId = setTimeout(() => {
        setShowFallback(true);
        onShowFallback();
      }, fallbackDelayMs);

      return () => {
        clearInterval(timeoutId);
      };
    } else {
      setShowFallback(true);
      onShowFallback();
    }

    return;
  }, [fallbackDelayMs, onShowFallback]);

  return showFallback ? <>{fallback}</> : null;
};

const MIN_FALLBACK_DELAY_MS = 500;

export const SmartSuspense: FC<{
  children: React.ReactNode;
  fallback: React.ReactNode;
  fallbackDelayMs?: number;
  fallbackMinDurationMs?: number;
}> = ({
  children,
  fallback,
  fallbackDelayMs = 0,
  fallbackMinDurationMs = MIN_FALLBACK_DELAY_MS,
}) => {
  const [isWaitingFallbackMinDurationMs, setIsWaitingFallbackMinDurationMs] = useState(false);

  const timeoutIdRef = useRef<ReturnType<typeof setTimeout>>();

  const onShowFallback = useCallback(() => {
    setIsWaitingFallbackMinDurationMs(true);

    timeoutIdRef.current && clearInterval(timeoutIdRef.current);
    timeoutIdRef.current = setTimeout(() => {
      setIsWaitingFallbackMinDurationMs(false);
    }, fallbackMinDurationMs);
  }, [fallbackMinDurationMs]);

  useEffect(() => {
    return () => timeoutIdRef.current && clearInterval(timeoutIdRef.current);
  }, []);

  return (
    <Suspense
      fallback={
        <FallbackDelayer
          fallback={fallback}
          fallbackDelayMs={fallbackDelayMs}
          onShowFallback={onShowFallback}
        />
      }
    >
      {isWaitingFallbackMinDurationMs && <PromiseThrower />}
      {children}
    </Suspense>
  );
};
