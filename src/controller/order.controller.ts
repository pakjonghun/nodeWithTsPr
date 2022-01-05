import { Response, Request } from "express";
import { Parser } from "json2csv";
import * as service from "../service/order.service";
import { registerValidator } from "../validator/order.validator";
export const getAllOrders = async (req: Request, res: Response) => {
  console.log(req.query.page);
  const page = parseInt((req.query.page as string) || "1");
  const take = 15;
  const [data, total] = await service.getAllOrders(page, take);

  res.json({ data, meta: { page, total, lastPage: Math.ceil(total / take) } });
};

export const getOrder = async (req: Request, res: Response) => {
  const id = req.params.id;
  if (id == null) return res.status(400).json({ message: "no id" });

  res.json(await service.getOrder(id));
};

export const register = async (req: Request, res: Response) => {
  const body = req.body;
  const { error } = registerValidator.validate(body);
  if (error) return res.status(400).json(error.details);
  const order = await service.register(body);
  res.status(201).json(order);
};

export const extract = async (_: Request, res: Response) => {
  const csv = await service.extract();
  res.header("Content-Type", "text/csv");
  res.attachment("order.csv");
  res.send(csv);
};

export const chart = async (_: Request, res: Response, next: Function) => {
  try {
    res.json(await service.chart());
  } catch (err) {
    next(err);
    res.sendStatus(500);
  }
};

export const deleteOrder = async (
  req: Request,
  res: Response,
  next: Function
) => {
  try {
    const id = Number(req.params.id);

    if (id == null) return res.status(400).json({ message: "no id" });
    await service.deleteOrder(id);
    res.sendStatus(204);
  } catch (err) {
    next(err);
    res.sendStatus(500);
  }
};
