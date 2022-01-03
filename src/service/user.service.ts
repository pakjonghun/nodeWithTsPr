import { Users } from "./../entity/user.entity";
import { getConnection, getManager } from "typeorm";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (body) => {
  const userRepo = getManager().getRepository(Users);
  body.password = await bcrypt.hash(body.password, 10);
  return userRepo.save({ ...body, role: { id: 2 } });
};

export const getUser = async (id) => {
  const userRepo = getManager().getRepository(Users);
  return userRepo.findOne(id);
};

export const getAllUsers = async (page) => {
  const take = 5;
  const builder = getConnection()
    .createQueryBuilder()
    .select([
      "u.id id",
      "u.email email",
      "u.firstname firstname",
      "u.lastname lastname",
    ])
    .from(Users, "u");

  const total = await builder.getCount();

  const users = await builder
    .take(5)
    .skip((page - 1) * take)
    .execute();

  return {
    data: users,
    meta: { total, page, lastPage: Math.ceil(total / take) },
  };
};

export const editUser = async (id, body) => {
  const userRepo = getManager().getRepository(Users);
  return userRepo.save({
    id: Number(id),
    ...body,
  });
};

export const login = async ({ email, password }) => {
  const userRepo = getManager().getRepository(Users);
  const user = await userRepo.findOne({ email });
  if (!user) return { message: "login failed" };

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) return { message: "login failed" };

  const token = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET);

  return { user, token };
};
