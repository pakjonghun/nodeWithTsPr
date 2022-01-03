import { tokenMiddleware } from "./../middleware/token.middleware";
import { Router } from "express";
import {
  editUser,
  getAllUsers,
  getUser,
  login,
  me,
  register,
} from "../controller/user.controller";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", tokenMiddleware, me);
router.get("/", getAllUsers);
router.put("/:id", tokenMiddleware, editUser);

router.get("/:id", tokenMiddleware, getUser);

export default router;
