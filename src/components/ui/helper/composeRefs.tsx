import { useCallback } from 'react';

type PossibleRef<T> = React.Ref<T> | undefined;

// utility for taking care of differences between ref objects and ref callbacks
const setRef = <T,>(ref: PossibleRef<T>, value: T) => {
  if (typeof ref === 'function') {
    ref(value);
  } else if (ref !== null && ref !== undefined) {
    (ref as React.MutableRefObject<T>).current = value;
  }
};

// utility for compose multiple refs together
// could accept callback refs and object refs
const composeRefs =
  <T,>(...refs: PossibleRef<T>[]) =>
  (node: T) =>
    refs.forEach((ref) => setRef(ref, node));

// hook version of composeRefs
const useComposedRefs = <T,>(...refs: PossibleRef<T>[]) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useCallback(composeRefs(...refs), refs);
};

export { composeRefs, useComposedRefs };
