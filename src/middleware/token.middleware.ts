import { Users } from "./../entity/user.entity";
import { getManager } from "typeorm";
import { Response, Request } from "express";
import jwt from "jsonwebtoken";

export const tokenMiddleware = async (
  req: Request,
  res: Response,
  next: Function
) => {
  try {
    const token = req.cookies["jwt"];

    if (!token) {
      return res.status(403).json({ message: "unauthorized" });
    }

    const payload = jwt.verify(token, process.env.TOKEN_SECRET);
    if (typeof payload !== "object" || !("id" in payload)) {
      return res.status(403).json({ message: "unauthorized" });
    }

    const userRepo = getManager().getRepository(Users);
    const result = await userRepo.findOne(payload.id, {
      relations: ["role", "role.permissions"],
    });

    if (!result) {
      return res.status(403).json({ message: "unauthorized" });
    }
    const { password, ...user } = result;
    res.locals.user = user;

    next();
  } catch (err) {
    next(err);
  }
};
