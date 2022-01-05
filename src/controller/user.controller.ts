import { loginValidator } from "./../validator/user.validator";
import { Request, Response } from "express";
import { editValidator, registerValidator } from "../validator/user.validator";
import * as service from "../service/user.service";

export const register = async (req: Request, res: Response, next: Function) => {
  try {
    const body = req.body;
    const { error } = registerValidator.validate(body);
    if (body.password !== body.passwordConfirm || error) {
      return res.status(400).json(error.details);
    }

    delete body.passwordConfirm;
    const { password, ...user } = await service.register(body);
    res.status(201).json(user);
  } catch (err) {
    next(err);
    res.sendStatus(500);
  }
};

export const getUser = async (req: Request, res: Response) => {
  if (!req.params.id) {
    return res.status(400).json({ message: "validate failed" });
  }

  const { password, ...user } = await service.getUser(req.params.id);
  res.json(user);
};

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: Function
) => {
  try {
    const page = parseInt((req.query.page as string) || "0");
    const result = await service.getAllUsers(page);
    res.json(result);
  } catch (err) {
    next(err);
    res.sendStatus(500);
  }
};

export const editUser = async (req: Request, res: Response, next: Function) => {
  try {
    const body = req.body;
    const id = req.params.id;
    const { error } = editValidator.validate(body);
    if (error || id == null) {
      return res.status(400).json(error.details);
    }

    const { password, ...user } = await service.editUser(id, body);
    res.status(201).json(user);
  } catch (err) {
    next(err);
    res.sendStatus(500);
  }
};

export const login = async (req: Request, res: Response, next: Function) => {
  try {
    const body = req.body;
    const { error } = loginValidator.validate(body);
    if (error) return res.status(400).json(error.details);

    const { user, token } = await service.login(body);
    if (!user) return res.status(400).json({ message: "login failed" });

    const { password, ...rest } = user;
    res.cookie("jwt", token, { maxAge: 60 * 60 * 1000 * 24, httpOnly: true });
    res.json(rest);
  } catch (err) {
    next(err);
    res.sendStatus(500);
  }
};

export const me = (_: Request, res: Response) => {
  res.json(res.locals.user);
};

export const logout = async (req: Request, res: Response) => {
  res.cookie("jwt", "", { maxAge: 0 });
  res.sendStatus(200);
};

export const editInfo = async (req: Request, res: Response, next: Function) => {
  try {
    const body = req.body;
    const id = res.locals.user.id;
    const result = await service.editInfo(id, body);
    res.status(203).json(result);
  } catch (err) {
    next(err);
    res.sendStatus(500);
  }
};
export const editPassword = async (
  req: Request,
  res: Response,
  next: Function
) => {
  try {
    const body = req.body;
    const id = res.locals.user.id;
    const result = await service.editPassword(id, body);
    res.status(203).json(result);
  } catch (err) {
    next(err);
    res.sendStatus(500);
  }
};
