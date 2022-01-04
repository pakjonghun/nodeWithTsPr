import { Request, Response } from "express";
import { registerValidator } from "../validator/admin.validator";
import * as service from "../service/admin.service";

export const register = async (req: Request, res: Response, next: Function) => {
  try {
    const body = req.body;
    const { error } = registerValidator.validate(body);
    if (error) return res.status(400).json(error.details);
    const admin = await service.register(body);
    res.status(201).json(admin);
  } catch (err) {
    next(err);
    res.sendStatus(500);
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: Function
) => {
  try {
    const id = req.params.id;
    if (id == null) return res.status(400).json({ message: "insert id plz" });

    await service.deleteUser(Number(id));
    res.sendStatus(200);
  } catch (err) {
    next(err);
    res.sendStatus(500);
  }
};
