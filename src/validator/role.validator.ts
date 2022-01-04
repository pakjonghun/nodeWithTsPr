import Joi from "joi";

export const registerValidator = Joi.object({
  name: Joi.string().required(),
  permissions: Joi.array().required(),
});

export const editValidator = Joi.object({
  name: Joi.string(),
  permissions: Joi.array(),
});
