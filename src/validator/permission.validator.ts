import Joi from "joi";

export const registerValidator = Joi.object({
  name: Joi.string().required(),
});
