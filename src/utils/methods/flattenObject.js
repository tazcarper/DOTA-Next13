export const flattenObject = (obj = {}) =>
  Object.keys(obj || {}).reduce((acc, cur) => {
    if (typeof obj[cur] === "object") {
      acc = { ...acc, ...flattenObject(obj[cur]) };
    } else {
      acc[cur] = obj[cur];
    }
    return acc;
  }, {});
