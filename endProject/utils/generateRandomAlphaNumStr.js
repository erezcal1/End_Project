const generateRandomAlphaNumStr = (strSize) => {
  return [...Array(strSize)]
    .map(() => Math.floor(Math.random() * 16).toString(16))
    .join("");
};
module.exports = generateRandomAlphaNumStr;
