import { permissionMiddleware } from "./../middleware/permission.middleware";
import { Router } from "express";
import { getAllRoles, getRole, register } from "../controller/role.controller";

const router = Router();

router.post("/register", permissionMiddleware("role"), register);
router.get("/", getAllRoles);
router.get("/:id", getRole);

export default router;
