
import { Router } from "express";
import { adminMiddleware, authMiddleware } from "../../Middleware/auth.middleware.js";
import validationMiddleware from "../../Middleware/validation.middleware.js";
import { createOrder,getMyOrders,getAllOrders,getOrderById,cancelOrder,updateOrderStatus} from "./order.controller.js";
import { createOrderSchema,orderIdSchema,updateOrderStatusSchema} from "./order.validation.js";


const router = Router();

router.post("/", authMiddleware, validationMiddleware(createOrderSchema), createOrder);

router.get("/", authMiddleware, getMyOrders);

router.get("/all", authMiddleware, adminMiddleware, getAllOrders);

router.get("/:id", authMiddleware, validationMiddleware(orderIdSchema,"params"), getOrderById);

router.patch("/:id/cancel", authMiddleware, validationMiddleware(orderIdSchema,"params"), cancelOrder);

router.patch("/:id/status", authMiddleware, adminMiddleware, validationMiddleware(orderIdSchema,"params"), validationMiddleware(updateOrderStatusSchema), updateOrderStatus);

export default router;
