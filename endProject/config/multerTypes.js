const multer = require("./multer");

const allowedTypes = {
  img: "img",
  vid: "vid",
  sound: "sound",
  doc: "doc",
  custom: "custom",
  any: "any",
};

const filterFileType = (file, cb, typeOptions = allowedTypes.any) => {
  try {
    if (typeof typeOptions !== "object") {
      throw new Error("typeOptions is not an object");
    }
    if (!typeOptions.hasOwnProperty("type")) {
      throw new Error("missing type property");
    }
    if (typeof typeOptions.type !== "string") {
      throw new Error("type should be string");
    }
    let allowedFormats = [];
    switch (typeOptions.type) {
      case allowedTypes.img:
        allowedFormats = [
          "image/apng",
          "image/avif",
          "image/gif",
          "image/jpeg",
          "image/png",
          "image/svg+xml",
          "image/webp",
        ];
        break;
      case allowedTypes.vid:
        allowedFormats = [
          "video/x-flv",
          "video/mp4",
          "application/x-mpegURL",
          "video/MP2T",
          "video/3gpp",
          "video/quicktime",
          "video/x-msvideo",
          "video/x-ms-wmv",
          "video/x-matroska",
          "video/mpeg",
        ];
        break;
      case allowedTypes.sound:
        allowedFormats = [
          "audio/x-wav",
          "audio/x-aiff",
          "audio/mpeg",
          "audio/mp3",
          "application/ogg",
          "audio/midi",
          "audio/x-midi",
        ];
        break;
      case allowedTypes.doc:
        allowedFormats = [
          "application/pdf",
          "application/vnd.ms-powerpoint",
          "application/vnd.openxmlformats-officedocument.presentationml.presentation",
          "text/plain",
          "application/vnd.ms-excel",
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ];
        break;
      case allowedTypes.custom:
        if (!types.hasOwnProperty("customFormats")) {
          throw new Error("customFormats is missing");
        }
        if (!Array.isArray(types.customFormats)) {
          throw new Error("customFormats should be an array");
        }
        allowedFormats = types.customFormats;
        break;
      case allowedTypes.any:
        cb(null, true);
        return;
      default:
        throw new Error("please choose the correct type from allowedTypes");
    }
    cb(null, allowedFormats.includes(file.mimetype));
  } catch (err) {
    cb(err);
  }
};

module.exports = {
  allowedTypes,
  createMulter: (path, fileSize, typeOptions) => {
    return multer(path, fileSize, (req, file, cb) => {
      filterFileType(file, cb, typeOptions);
    });
  },
};
