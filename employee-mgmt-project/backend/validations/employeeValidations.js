// backend/validations/employeeValidations.js
const Joi = require('joi');

const validateEmployee = Joi.object({
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  email: Joi.string().email().required(),
  gender: Joi.string().valid('Male', 'Female', 'Other').required(),
  designation: Joi.string().required(),
  salary: Joi.number().min(1000).required(),
  date_of_joining: Joi.string().required(),
  department: Joi.string().required(),
  employee_photo: Joi.string().uri().required()
});

module.exports = { validateEmployee };
