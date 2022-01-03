import { permissionMiddleware } from "./../middleware/permission.middleware";
import { tokenMiddleware } from "./../middleware/token.middleware";
import { Router } from "express";
import { register } from "../controller/permission.controller";
const router = Router();

router.post(
  "/register",
  tokenMiddleware,
  permissionMiddleware("permission"),
  register
);
export default router;
