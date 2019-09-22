/**
 * Auxiliary method to sanitize empty fields to adapt to Dynamo restriction
 * @param target
 */
const removeEmptyStringFromJson = (target) => {
  // eslint-disable-next-line array-callback-return
  Object.keys(target).map((key) => {
    if (target[key] instanceof Object) {
      removeEmptyStringFromJson(target[key]);
    } else if (target[key] === '') {
      target[key] = null; // eslint-disable-line no-param-reassign
    }
  });
  return target;
};

module.exports = {
  removeEmptyStringFromJson,
};
