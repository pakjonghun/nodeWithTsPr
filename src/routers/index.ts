import { tokenMiddleware } from "./../middleware/token.middleware";
import { imageUplaod } from "./../controller/image.controller";
import { Router } from "express";
import userRouter from "./user.routes";
import roleRouter from "./role.routes";
import adminRouter from "./admin.routes";
import productRouter from "./product.routes";
import permissioinRouter from "./permission.routes";
import orderRouter from "./order.routes";

const router = Router();

router.use("/users", userRouter);
router.use("/roles", roleRouter);
router.use("/admin", adminRouter);
router.use("/products", productRouter);
router.use("/permissions", permissioinRouter);
router.use("/orders", orderRouter);
router.post("/upload", imageUplaod);

export default router;
