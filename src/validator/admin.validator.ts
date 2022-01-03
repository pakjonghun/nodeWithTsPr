import Joi from "joi";

export const registerValidator = Joi.object({
  firstname: Joi.string().required(),
  lastname: Joi.string().required(),
  email: Joi.string().email().required(),
  roleId: Joi.number().required(),
});
