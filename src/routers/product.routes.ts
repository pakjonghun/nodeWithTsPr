import { tokenMiddleware } from "./../middleware/token.middleware";
import { Router } from "express";
import {
  getAllProducts,
  getProduct,
  register,
} from "../controller/product.controller";

const router = Router();

router.post("/register", tokenMiddleware, register);
router.get("/", getAllProducts);
router.get("/:id", getProduct);

export default router;
