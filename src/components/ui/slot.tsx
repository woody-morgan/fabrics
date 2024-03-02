import React, { Children, FC, HTMLAttributes, forwardRef } from 'react';

import { composeRefs } from './helper';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyProps = Record<string, any>;

const mergeProps = (slotProps: AnyProps, childProps: AnyProps) => {
  // all child props should be overrided
  const overrideProps = { ...childProps };

  for (const propName in childProps) {
    const slotPropValue = slotProps[propName];
    const childPropValue = childProps[propName];

    const isHandler = /^on[A-Z]/.test(propName);
    if (isHandler) {
      // exist on both
      if (slotPropValue && childPropValue) {
        overrideProps[propName] = (...args: unknown[]) => {
          childPropValue(...args);
          slotPropValue(...args);
        };
      } else if (slotPropValue) {
        overrideProps[propName] = slotPropValue;
      }
    } else if (propName === 'style') {
      overrideProps[propName] = { ...slotPropValue, ...childPropValue };
    } else if (propName === 'className') {
      overrideProps[propName] = [slotPropValue, childPropValue].filter(Boolean).join(' ');
    }
  }

  return { ...slotProps, ...overrideProps };
};

// ==============================

const Slottable: FC<{ children: React.ReactNode }> = ({ children }) => <>{children}</>;

const isSlottable = (child: React.ReactNode): child is React.ReactElement =>
  React.isValidElement(child) && child.type === Slottable;

// ==============================

type SlotCloneProps = {
  children: React.ReactNode;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SlotClone = forwardRef<any, SlotCloneProps>((props, forwardedRef) => {
  const { children, ...slotProps } = props;

  if (React.isValidElement(children)) {
    return React.cloneElement(children, {
      ...mergeProps(slotProps, children.props),
      // @ts-expect-error ignore typescript error because ref could not be type defined
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref: forwardedRef ? composeRefs(forwardedRef, (children as any).ref) : (children as any).ref,
    });
  }

  return Children.count(children) > 1 ? Children.only(null) : null;
});

SlotClone.displayName = 'SlotClone';

// ==============================

type SlotProps = HTMLAttributes<HTMLElement> & {
  children?: React.ReactNode;
};

const Slot = forwardRef<HTMLElement, SlotProps>((props, forwardedRef) => {
  const { children, ...slotProps } = props;
  const childrenArray = Children.toArray(children);
  const slottable = childrenArray.find(isSlottable);

  if (slottable) {
    const newElement = slottable.props.children as React.ReactNode;

    const newChildren = childrenArray.map((child) => {
      if (child === slottable) {
        // make sure there is only one child
        if (Children.count(newElement) > 1) return Children.only(null);
        return React.isValidElement(newElement)
          ? (newElement.props.children as React.ReactNode)
          : null;
      } else {
        return child;
      }
    });

    return (
      <SlotClone {...slotProps} ref={forwardedRef}>
        {React.isValidElement(newElement)
          ? React.cloneElement(newElement, undefined, newChildren)
          : null}
      </SlotClone>
    );
  }

  return (
    <SlotClone {...slotProps} ref={forwardedRef}>
      {children}
    </SlotClone>
  );
});

Slot.displayName = 'Slot';

const Root = Slot;

export {
  Slot,
  Slottable,
  //
  Root,
};

export type { SlotProps };
