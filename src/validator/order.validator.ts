import Joi from "joi";

export const registerValidator = Joi.object({
  email: Joi.string().email().required(),
  firstname: Joi.string().required(),
  lastname: Joi.string().required(),
  orderItems: Joi.array().required(),
});
