export type TestData<Input, Output = unknown> = {
  readonly input: Input;
  readonly output: Output;
  readonly description?: string;
};

export type CommonUtilTestData<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  T extends (...args: any) => any,
  Output = unknown,
> = TestData<Parameters<T>, Output>[];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type CommonUtilTestDataWithOutput<T extends (...args: any) => any> =
  | CommonUtilTestData<T>
  | CommonUtilTestData<T, ReturnType<T>>;

export type StrictlyReturnEveryUtilTestData<T extends Record<string, unknown>> = Record<
  keyof T,
  readonly TestData<Parameters<T[keyof T]>, unknown>[]
>;
