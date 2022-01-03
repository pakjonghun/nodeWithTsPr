import { Response, Request } from "express";
import { registerValidator } from "../validator/permission.validator";
import * as service from "../service/psermission.service";
export const register = async (req: Request, res: Response, next: Function) => {
  try {
    const body = req.body;
    const { error } = registerValidator.validate(body);
    if (error) return res.status(400).json(error.details);
    const permission = service.register(body);
    res.status(201).json(permission);
  } catch (err) {
    next(err);
    res.sendStatus(500);
  }
};
