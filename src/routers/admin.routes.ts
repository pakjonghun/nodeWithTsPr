import { tokenMiddleware } from "./../middleware/token.middleware";
import { permissionMiddleware } from "./../middleware/permission.middleware";
import { Router } from "express";
import { deleteUser, register } from "../controller/admin.controller";

const router = Router();

router.post(
  "/register",
  tokenMiddleware,
  permissionMiddleware("user"),
  register
);

router.delete(
  "/:id",
  tokenMiddleware,
  permissionMiddleware("user"),
  deleteUser
);

export default router;
