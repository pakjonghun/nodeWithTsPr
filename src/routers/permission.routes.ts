import { permissionMiddleware } from "./../middleware/permission.middleware";
import { tokenMiddleware } from "./../middleware/token.middleware";
import { Router } from "express";
import {
  getAllPermissions,
  register,
} from "../controller/permission.controller";
const router = Router();

router
  .post(
    "/register",
    tokenMiddleware,
    permissionMiddleware("permission"),
    register
  )
  .get("/", tokenMiddleware, getAllPermissions);

export default router;
