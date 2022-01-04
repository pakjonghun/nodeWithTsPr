import { Request, Response } from "express";
import { editValidator, registerValidator } from "../validator/role.validator";
import * as service from "../service/role.service";

export const register = async (req: Request, res: Response, next: Function) => {
  try {
    const body = req.body;
    const { error } = registerValidator.validate(body);
    if (error) return res.status(400).json(error.details);
    const role = await service.register(body);
    res.status(201).json(role);
  } catch (err) {
    next(err);
    res.sendStatus(500);
  }
};

export const getAllRoles = async (
  req: Request,
  res: Response,
  next: Function
) => {
  try {
    const take = 15;
    const page = parseInt((req.query.page as string) || "0") || 1;
    const [roles, total] = await service.getAllRoles(page, take);
    res.json({
      data: roles,
      meta: { total, page, lastPage: Math.ceil(total / take) },
    });
  } catch (err) {
    next(err);
    res.sendStatus(500);
  }
};

export const getRole = async (req: Request, res: Response, next: Function) => {
  try {
    const id = req.params.id;
    if (id == null) return res.status(400).json({ message: "no id" });
    res.json(await service.getRole(id));
  } catch (err) {
    next(err);
    res.sendStatus(500);
  }
};

export const deleteRole = async (
  req: Request,
  res: Response,
  next: Function
) => {
  try {
    const id = req.params.id;
    if (id == null) {
      return res.status(400).json({ message: "no id" });
    }

    await service.deleteRole(Number(id));
    res.sendStatus(204);
  } catch (err) {
    next(err);
    res.sendStatus(500);
  }
};

export const editRole = async (req: Request, res: Response, next: Function) => {
  try {
    const body = req.body;
    const id = req.params.id;
    const { error } = editValidator.validate(body);

    if (error) return res.status(400).json(error.details);
    if (id == null) return res.status(400).json({ message: "no id" });

    const result = await service.editRole(Number(id), body);
  } catch (err) {
    next(err);
    res.sendStatus(500);
  }
};
