export const isEmptyObject = (object) =>
  object === null || object === undefined
    ? true
    : Object.entries(object).length === 0
    ? true
    : false;
