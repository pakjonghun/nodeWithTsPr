import { Permissions } from "./../entity/permission.entity";
import { getManager } from "typeorm";
export const register = async (body) => {
  const permissionRepo = getManager().getRepository(Permissions);
  return permissionRepo.save({
    ...body,
  });
};
