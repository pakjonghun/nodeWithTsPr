import { Router } from "express";
import {
  chart,
  extract,
  getAllOrders,
  getOrder,
  register,
} from "../controller/order.controller";
import { tokenMiddleware } from "../middleware/token.middleware";
const router = Router();

router
  .post("/", tokenMiddleware, register)
  .post("/extract", tokenMiddleware, extract)
  .get("/", tokenMiddleware, getAllOrders)
  .get("/chart", tokenMiddleware, chart)
  .get("/:id", tokenMiddleware, getOrder);

export default router;
