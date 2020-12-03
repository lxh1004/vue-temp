/**
 * 数组去重
 */
const unique = (arr) => {
  let obj = {};
  return arr.filter((item) => {
    return obj.hasOwnProperty(typeof item + item)
      ? false
      : (obj[typeof item + item] = true);
  });
};
export { unique };
