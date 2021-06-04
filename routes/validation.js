//Validation
const Joi = require("@hapi/joi");

//Registration validation

const regValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().min(7).required().email(),
    password: Joi.string().min(6).required()
  });
  return Joi.validate(data, schema);
};

const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(7).required().email(),
    password: Joi.string().min(6).required()
  });
  return schema.validate(data, schema);
};

module.exports.regValidation = regValidation;
module.exports.loginValidation = loginValidation;
