import { Permissions } from "./../entity/permission.entity";
import { getManager } from "typeorm";
export const register = async (body) => {
  const permissionRepo = getManager().getRepository(Permissions);
  return permissionRepo.save({
    ...body,
  });
};

export const getAllPermissions = async (page: number, take: number) => {
  const permissionRepo = getManager().getRepository(Permissions);
  return permissionRepo.findAndCount({ take, skip: (page - 1) * take });
};
