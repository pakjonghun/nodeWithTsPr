import { tokenMiddleware } from "./../middleware/token.middleware";
import { permissionMiddleware } from "./../middleware/permission.middleware";
import { Router } from "express";
import {
  deleteRole,
  editRole,
  getAllRoles,
  getRole,
  register,
} from "../controller/role.controller";

const router = Router();

router
  .post("/register", tokenMiddleware, permissionMiddleware("role"), register)
  .get("/", getAllRoles)
  .get("/:id", getRole)
  .delete("/:id", deleteRole)
  .put("/:id", editRole);

export default router;
