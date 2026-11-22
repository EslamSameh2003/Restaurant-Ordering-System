import {Router} from "express";
import { authMiddleware } from "../../Middleware/auth.middleware.js";
import { getCartItems, addToCart, updateCartItem, removeCartItem, clearCart } from "./cart.controller.js";
import { addToCartSchema,updateCartItemSchema } from "./cart.validation.js";
import validationMiddleware from "../../Middleware/validation.middleware.js";


const router = Router();

router.get("/", authMiddleware ,getCartItems);
router.post("/items", authMiddleware, validationMiddleware(addToCartSchema),addToCart);
router.patch("/items/:foodID", authMiddleware, validationMiddleware(updateCartItemSchema),updateCartItem);
router.delete("/items/:foodID", authMiddleware, removeCartItem);
router.delete("/", authMiddleware, clearCart);






export default router;