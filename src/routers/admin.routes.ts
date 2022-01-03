import { tokenMiddleware } from "./../middleware/token.middleware";
import { permissionMiddleware } from "./../middleware/permission.middleware";
import { Router } from "express";
import { register } from "../controller/admin.controller";

const router = Router();

router.post(
  "/register",
  tokenMiddleware,
  permissionMiddleware("user"),
  register
);

export default router;
