const Joi = require("joi");

const emailRole = {
  email: Joi.string().email().min(6).max(255).trim().required(),
};

const passwordRole = {
  password: Joi.string()
    .regex(
      new RegExp(
        "^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*() ]).{6,12}$"
      )
    )
    .required(),
};

const firstNameRole = {
  firstName: Joi.string().min(2).max(255).alphanum().trim().required(),
};

const lastNameRole = {
  lastName: Joi.string().min(2).max(255).alphanum().trim().required(),
};

const sellerRole = {
  isSeller: Joi.boolean(),
};

const signUpSchema = Joi.object({
  ...emailRole,
  ...passwordRole,
  ...firstNameRole,
  ...lastNameRole,
  ...sellerRole,
});
const signInSchema = Joi.object({
  ...emailRole,
  ...passwordRole,
  ...sellerRole,
});
const forgetPassSchema = Joi.object({
  ...emailRole,
});
const recoveryPassword = Joi.object({
  ...passwordRole,
});
const recoveryPassEmailCheckSchema = Joi.object({
  ...emailRole,
});

const validateSignUpSchema = (data) => {
  return signUpSchema.validateAsync(data, { abortEarly: false });
};
const validateSignInSchema = (data) => {
  return signInSchema.validateAsync(data, { abortEarly: false });
};
const validateForgetPasswordSchema = (data) => {
  return forgetPassSchema.validateAsync(data, { abortEarly: false });
};
const validateRecoveryPasswordSchema = (data) => {
  return recoveryPassword.validateAsync(data, { abortEarly: false });
};
const validateRecoveryPassEmailCheckSchema = (data) => {
  return recoveryPassEmailCheckSchema.validateAsync(data, {
    abortEarly: false,
  });
};
module.exports = {
  validateSignUpSchema,
  validateSignInSchema,
  validateForgetPasswordSchema,
  validateRecoveryPasswordSchema,
  validateRecoveryPassEmailCheckSchema,
};
