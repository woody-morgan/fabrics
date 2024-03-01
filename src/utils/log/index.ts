export const log = <T>(data: T) => {
  console.log(data);
  return data;
};

export const logWith =
  <T>(fn: (data: T) => void) =>
  (data: T) => {
    fn(data);
    return data;
  };
