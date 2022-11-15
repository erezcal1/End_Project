const Joi = require("joi");

const nameRole = {
  name: Joi.string().min(2).max(255).trim().required(),
};

const artistRole = {
  artist: Joi.string().min(2).max(255).required(),
};

const descriptionRole = {
  description: Joi.string().min(1).max(16000).trim().required(),
};

const lyricRole = {
  lyric: Joi.string().min(10).max(16000).required(),
};

const newSongSchema = Joi.object({
  ...nameRole,
  ...descriptionRole,
  ...lyricRole,
  ...artistRole,
});

const validateNewSongSchema = (data) => {
  return newSongSchema.validateAsync(data, { abortEarly: false });
};

module.exports = {
  validateNewSongSchema,
};
