import Joi from "joi";

export const registerValidator = Joi.object({
  price: Joi.number().required(),
  title: Joi.string().required(),
  description: Joi.string().required(),
  image: Joi.string().required(),
});
