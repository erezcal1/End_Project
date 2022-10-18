const Joi = require("joi");

const nameRole = {
  name: Joi.string().min(2).max(255).alphanum().trim().required(),
};

const artistRole = {
  name: Joi.string().min(2).max(255).alphanum().trim().required(),
};

const descriptionRole = {
  description: Joi.string().min(1).max(16000).trim().required(),
};

const lyricRole = {
  lyric: Joi.number().min(0),
};

const newSongSchema = Joi.object({
  ...nameRole,
  ...descriptionRole,
  ...lyricRole,
  ...artistRole,
});

const validateNewSongSchema = (data) => {
  return newSongSchema, validateAsync(data, { abortEarly: false });
};

module.exports = {
  validateNewSongSchema,
};
