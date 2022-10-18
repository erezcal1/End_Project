const crypto = require("crypto");

const algorithm = process.env.ALGORITHM;

// secretKey need to be 32 chars long
const secretKey = process.env.SECRET_KEY_CRYPTO;

const encrypt = (data) => {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
  const encryptedData = Buffer.concat([cipher.update(data), cipher.final()]);
  return {
    iv: iv.toString("hex"),
    encryptedData: encryptedData.toString("hex"),
  };
};

const decrypt = (hashAndIv) => {
  const decipher = crypto.createDecipheriv(
    algorithm,
    secretKey,
    Buffer.from(hashAndIv.iv, "hex")
  );
  const decryptedData = Buffer.concat([
    decipher.update(Buffer.from(hashAndIv.encryptedData, "hex")),
    decipher.final(),
  ]);
  return decryptedData.toString();
};

module.export = {
  encrypt,
  decrypt,
};
