
import sequelize from "../../DB/Connection.js";
import Cart from "../../DB/Models/cart.js";
import CartItem from "../../DB/Models/cartitem.js";
import Food from "../../DB/Models/food.js";
import Order from "../../DB/Models/order.js";
import OrderItem from "../../DB/Models/orderitem.js";
import Discount from "../../DB/Models/discount.js";
import AppError from "../../utils/AppError.js";



// Helper: Round money to 2 decimal places
const roundMoney = (amount) => {
    return Math.round((Number(amount) + Number.EPSILON) * 100) / 100;
};


// Helper: Check Admin role
const isAdmin = (role) => {
    return role?.toLowerCase() === "admin";
};


// Helper: Validate Discount Code
const validateDiscount = async (discountCode, subtotal, transaction) => {
    if (!discountCode) {
        return null;
    }

    const discount = await Discount.findOne({
        where: { code: discountCode },
        transaction
    });

    if (!discount) {
        throw new AppError("Invalid discount code", 400);
    }

    if (!discount.isActive) {
        throw new AppError("This discount code is inactive", 400);
    }

    if (discount.expiresAt && new Date(discount.expiresAt) < new Date()) {
        throw new AppError("This discount code has expired", 400);
    }

    if (subtotal < Number(discount.minOrderAmount)) {
        throw new AppError(
            `Minimum order amount for this discount is ${discount.minOrderAmount}`,
            400
        );
    }

    const value = Number(discount.value);

    if (value <= 0) {
        throw new AppError("Invalid discount configuration", 400);
    }

    let discountAmount = 0;

    if (discount.type === "Percentage") {
        if (value > 100) {
            throw new AppError("Invalid percentage discount", 400);
        }

        discountAmount = roundMoney(subtotal * (value / 100));

        if (discount.maxDiscount !== null) {
            discountAmount = Math.min(
                discountAmount,
                Number(discount.maxDiscount)
            );
        }

    } else if (discount.type === "Fixed") {
        discountAmount = value;

    } else {
        throw new AppError("Invalid discount type", 400);
    }

    // Discount cannot exceed subtotal
    discountAmount = Math.min(discountAmount, subtotal);

    return {
        discount,
        discountAmount: roundMoney(discountAmount)
    };
};


// 1. Create Order
const createOrderService = async (userID, discountCode) => {

    return await sequelize.transaction(async (transaction) => {

        // Get user's cart and lock it during order creation
        const cart = await Cart.findOne({
            where: { userID },
            include: [
                {
                    model: CartItem,
                    include: [Food]
                }
            ],
            transaction,
            lock: transaction.LOCK.UPDATE
        });

        if (!cart || cart.cartItems.length === 0) {
            throw new AppError("Your cart is empty", 400);
        }

        const cartItems = cart.cartItems;

        // Check food availability and calculate subtotal
        let subtotal = 0;

        for (const item of cartItems) {
            const food = item.food;

            if (!food || !food.isAvailable) {
                throw new AppError(
                    `Food item is unavailable: ${food?.name || item.foodID}`,
                    400
                );
            }

            const price = Number(food.price);

            if (!Number.isFinite(price) || price <= 0) {
                throw new AppError(
                    `Invalid price for food: ${food.name}`,
                    400
                );
            }

            subtotal += price * item.quantity;
        }

        subtotal = roundMoney(subtotal);

        // Validate discount
        const discountResult = await validateDiscount(
            discountCode,
            subtotal,
            transaction
        );

        const discountAmount = discountResult
            ? discountResult.discountAmount
            : 0;

        const discountID = discountResult
            ? discountResult.discount.id
            : null;

        const total = roundMoney(subtotal - discountAmount);

        // Create Order
        const order = await Order.create({
            userID,
            subtotal,
            discountAmount,
            total,
            discountID,

            // Cash on Delivery for now
            paymentMethod: "Cash",
            paymentStatus: "Pending",

            status: "Pending"
        }, { transaction });


        // Create Order Items (Price and Name snapshots)
        const orderItems = cartItems.map((item) => {
            const food = item.food;
            const price = roundMoney(Number(food.price));

            return {
                orderID: order.id,
                foodID: food.id,
                foodName: food.name,
                price,
                quantity: item.quantity,
                total: roundMoney(price * item.quantity)
            };
        });

        await OrderItem.bulkCreate(orderItems, { transaction });


        // Clear cart only after successful order creation
        await CartItem.destroy({
            where: { cartID: cart.id },
            transaction
        });


        // Return complete order
        const createdOrder = await Order.findByPk(order.id, {
            include: [OrderItem, Discount],
            transaction
        });

        return createdOrder;
    });
};


// 2. Get My Orders
const getMyOrdersService = async (userID) => {

    const orders = await Order.findAll({
        where: { userID },
        include: [OrderItem, Discount],
        order: [["createdAt", "DESC"]]
    });

    return orders;
};


// 3. Get All Orders (Admin)
const getAllOrdersService = async () => {

    const orders = await Order.findAll({
        include: [OrderItem, Discount],
        order: [["createdAt", "DESC"]]
    });

    return orders;
};


// 4. Get Order By ID
const getOrderByIdService = async (id, userID, role) => {

    const order = await Order.findByPk(id, {
        include: [OrderItem, Discount]
    });

    if (!order) {
        throw new AppError("Order not found", 404);
    }

    // Customer can only access their own order
    if (!isAdmin(role) && Number(order.userID) !== Number(userID)) {
        throw new AppError("Order not found", 404);
    }

    return order;
};


// 5. Cancel Order
const cancelOrderService = async (id, userID, role) => {

    return await sequelize.transaction(async (transaction) => {

        const order = await Order.findByPk(id, {
            transaction,
            lock: transaction.LOCK.UPDATE
        });

        if (!order) {
            throw new AppError("Order not found", 404);
        }

        if (!isAdmin(role) && Number(order.userID) !== Number(userID)) {
            throw new AppError("Order not found", 404);
        }

        // Only Pending orders can be cancelled
        if (order.status !== "Pending") {
            throw new AppError(
                "Only pending orders can be cancelled",
                400
            );
        }

        await order.update({
            status: "Cancelled"
        }, { transaction });

        return order;
    });
};


// 6. Update Order Status (Admin)
const updateOrderStatusService = async (id, status) => {

    return await sequelize.transaction(async (transaction) => {

        const order = await Order.findByPk(id, {
            transaction,
            lock: transaction.LOCK.UPDATE
        });

        if (!order) {
            throw new AppError("Order not found", 404);
        }

        // Delivered and Cancelled are terminal states
        if (["Delivered", "Cancelled"].includes(order.status)) {
            throw new AppError(
                `Cannot update an order with status ${order.status}`,
                400
            );
        }

        await order.update({
            status
        }, { transaction });

        return order;
    });
};


export {
    createOrderService,
    getMyOrdersService,
    getAllOrdersService,
    getOrderByIdService,
    cancelOrderService,
    updateOrderStatusService
};






