// backend/validations/userValidations.js
const Joi = require('joi');

const validateSignup = Joi.object({
  username: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(5).required()
});

const validateLogin = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required()
});

module.exports = { validateSignup, validateLogin };
