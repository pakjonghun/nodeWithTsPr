import { tokenMiddleware } from "./../middleware/token.middleware";
import { Router } from "express";
import {
  deleteProduct,
  getAllProducts,
  getProduct,
  register,
} from "../controller/product.controller";
import { permissionMiddleware } from "../middleware/permission.middleware";

const router = Router();

router
  .post("/register", tokenMiddleware, register)
  .get("/", getAllProducts)
  .get("/:id", getProduct)
  .delete(
    "/:id",
    tokenMiddleware,
    // permissionMiddleware("production"),
    deleteProduct
  );

export default router;
