const characters =
  "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

function encodeBase62(num) {
  let str = "";

  while (num > 0) {
    str = characters[num % 62] + str;
    num = Math.floor(num / 62);
  }

  return str;
}

module.exports = { encodeBase62 };
