import { Response } from "express";
import { Request } from "express";
import {
  editValidator,
  registerValidator,
} from "../validator/product.validator";
import * as service from "../service/product.service";

export const register = async (req: Request, res: Response, next: Function) => {
  try {
    const body = req.body;
    const { error } = registerValidator.validate(body);
    if (error) return res.status(400).json(error.details);
    const product = await service.register(body);
    res.status(201).json(product);
  } catch (err) {
    next(err);
    res.sendStatus(500);
  }
};

export const getAllProducts = async (
  req: Request,
  res: Response,
  next: Function
) => {
  try {
    const take = 15;
    const page = parseInt((req.query.page as string) || "0") || 1;

    const [roles, total] = await service.getAllProducts(take, page);
    res.json({
      data: roles,
      meta: { total, page, lastPage: Math.ceil(total / take) },
    });
  } catch (err) {
    next(err);
    res.sendStatus(500);
  }
};

export const getProduct = async (req: Request, res: Response) => {
  const id = req.params.id;
  if (id == null) return res.status(400).json({ message: "no id" });

  res.json(await service.getProduct(id));
};

export const deleteProduct = async (
  req: Request,
  res: Response,
  next: Function
) => {
  try {
    const id = Number(req.params.id);
    if (id == null) return res.status(400).json({ message: "no id" });
    await service.deleteProduct(id);
    res.sendStatus(203);
  } catch (err) {
    next(err);
    res.sendStatus(500);
  }
};

export const editProduct = async (
  req: Request,
  res: Response,
  next: Function
) => {
  try {
    const body = req.body;
    const id = req.params.id;
    const { error } = editValidator.validate(body);
    if (error) res.status(400).json(error.details);
    if (id == null) return res.status(400).json({ message: "no id" });
    await service.editProduct(Number(id), body);

    res.sendStatus(203);
  } catch (err) {
    next(err);
    res.sendStatus(500);
  }
};
