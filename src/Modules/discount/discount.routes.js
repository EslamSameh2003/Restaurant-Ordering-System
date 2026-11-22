
import { Router } from "express";
import { authMiddleware, adminMiddleware } from "../../Middleware/auth.middleware.js";
import validationMiddleware from "../../Middleware/validation.middleware.js";
import { createDiscount, getAllDiscounts, getDiscountById, updateDiscount, deleteDiscount } from "./discount.controller.js";
import { createDiscountSchema, updateDiscountSchema, discountIdSchema } from "./discount.validation.js";

const router = Router();

// Create Discount (Admin)
router.post("/", authMiddleware, adminMiddleware, validationMiddleware(createDiscountSchema), createDiscount);

// Get All Discounts (Admin)
router.get("/", authMiddleware, adminMiddleware, getAllDiscounts);

// Get Discount By ID (Admin)
router.get("/:id", authMiddleware, adminMiddleware, validationMiddleware(discountIdSchema, "params"), getDiscountById);

// Update Discount (Admin)
router.patch("/:id", authMiddleware, adminMiddleware, validationMiddleware(discountIdSchema, "params"), validationMiddleware(updateDiscountSchema), updateDiscount);

// Delete Discount (Admin)
router.delete("/:id", authMiddleware, adminMiddleware, validationMiddleware(discountIdSchema, "params"), deleteDiscount);

export default router;
