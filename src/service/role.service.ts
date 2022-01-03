import { Permissions } from "./../entity/permission.entity";
import { Roles } from "./../entity/role.entity";
import { getConnection, getManager } from "typeorm";

export const register = async ({ name, permissions }) => {
  const roleRepo = getManager().getRepository(Roles);

  return roleRepo.save({
    name,
    permissions: permissions.map((id) => ({ id })),
  });
};

export const getAllRoles = async (page, take) => {
  const roleRepo = getManager().getRepository(Roles);
  return roleRepo.findAndCount({
    take,
    skip: (page - 1) * take,
    relations: ["permissions"],
  });
};

export const getRole = async (id) => {
  const roleRepo = getManager().getRepository(Roles);
  return roleRepo.findOne({
    where: { id: Number(id) },
    relations: ["permissions"],
  });
};
