import { Router } from "express";
import {
  chart,
  deleteOrder,
  editOrder,
  extract,
  getAllOrders,
  getOrder,
  register,
} from "../controller/order.controller";
import { tokenMiddleware } from "../middleware/token.middleware";
const router = Router();

router
  .post("/", tokenMiddleware, register)
  .get("/extract", tokenMiddleware, extract)
  .get("/", tokenMiddleware, getAllOrders)
  .get("/chart", tokenMiddleware, chart)
  .get("/:id", tokenMiddleware, getOrder)
  .delete("/:id", tokenMiddleware, deleteOrder)
  .put("/:id", tokenMiddleware, editOrder);

export default router;
