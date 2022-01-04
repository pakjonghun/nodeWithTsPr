import { getManager } from "typeorm";
import { Users } from "../entity/user.entity";
import bcrypt from "bcrypt";

export const register = async (body) => {
  const adminRepo = getManager().getRepository(Users);
  const password = await bcrypt.hash("1234", 10);
  const save = { password, role: { id: body.roleId }, ...body };
  delete save.roleId;
  return adminRepo.save(save);
};

export const deleteUser = async (id: number) => {
  const userRepo = getManager().getRepository(Users);
  await userRepo.delete(id);
};
