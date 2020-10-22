const deepclone = (obj) => {
  let o;
  if (typeof obj === "object") {
    // 如果  他是空的话
    if (obj === null) {
      o = null;
    } else {
      // 如果  他是数组arr的话
      if (obj instanceof Array) {
        o = [];
        for (let item of obj) {
          o.push(deepclone(item));
        }
      } else {
        // 如果  他是对象object的话
        o = {};
        for (let j in obj) {
          o[j] = deepclone(obj[j]);
        }
      }
    }
  } else {
    o = obj;
  }
  return o;
};

export default {
  deepclone,
};
