import express from "express";
import authRoutes from "./Modules/auth/auth.routes.js";
import errorHandler from "./Middleware/error.middleware.js";
import categoryRoutes from './Modules/category/category.routes.js';
import foodRouter from './Modules/food/food.routes.js';
import cartRouter from './Modules/cart/cart.routes.js';
import orderRouter from './Modules/order/order.routes.js'
import discountRouter from './Modules/discount/discount.routes.js'

const app = express();
// Middleware to parse JSON request bodies
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/food", foodRouter); // Use the food router for /api/foods routes
app.use("/api/cart", cartRouter); // Use the cart router for /api/cart routes
app.use("/api/orders", orderRouter)
app.use("/api/discounts", discountRouter);

// Global Error Handler - Always last
app.use(errorHandler);

export default app;