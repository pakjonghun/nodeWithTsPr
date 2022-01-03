import { Roles } from "./../entity/role.entity";
import { Permissions } from "./../entity/permission.entity";
import { createConnection, getManager } from "typeorm";

createConnection().then(async (connection) => {
  const perRepo = getManager().getRepository(Permissions);
  const roleRepo = getManager().getRepository(Roles);

  const permissions = [
    "view_user",
    "edit_user",
    "view_order",
    "edit_order",
    "view_role",
    "edit_role",
    "view_permission",
    "edit_permission",
  ];

  const permissionsInDB = [];

  for (let name of permissions) {
    const permission = await perRepo.save({ name });
    permissionsInDB.push(permission);
  }

  await roleRepo.save({
    name: "admin",
    permissions: permissionsInDB,
  });

  delete permissionsInDB[5];
  delete permissionsInDB[7];
  await roleRepo.save({
    name: "editor",
    permissions: permissionsInDB,
  });

  delete permissionsInDB[1];
  delete permissionsInDB[3];
  await roleRepo.save({
    name: "viewer",
    permissions: permissionsInDB,
  });

  process.exit(0);
});
