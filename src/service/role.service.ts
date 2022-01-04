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
    relations: ["permissions"],
    take,
    skip: (page - 1) * take,
  });
};

export const getRole = async (id) => {
  const roleRepo = getManager().getRepository(Roles);
  return roleRepo.findOne({
    where: { id: Number(id) },
    relations: ["permissions"],
  });
};

export const deleteRole = async (id: number) => {
  const roleRepo = getManager().getRepository(Roles);
  await roleRepo.delete(id);
};

export const editRole = async (id: number, { permissions, ...rest }) => {
  const roleRepo = getManager().getRepository(Roles);
  await roleRepo.save({
    id,
    ...rest,
    permissions: permissions.map((permission) => {
      id: permission.id;
    }),
  });
};
