import { tokenMiddleware } from "./../middleware/token.middleware";
import { Router } from "express";
import {
  editUser,
  getAllUsers,
  getUser,
  login,
  logout,
  me,
  register,
} from "../controller/user.controller";

const router = Router();

router
  .post("/register", register)
  .get("/logout", logout)
  .post("/login", login)
  .get("/me", tokenMiddleware, me)
  .get("/", getAllUsers)
  .put("/:id", tokenMiddleware, editUser)
  .get("/:id", tokenMiddleware, getUser);

export default router;
