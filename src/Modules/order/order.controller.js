
import {
    createOrderService,
    getMyOrdersService,
    getAllOrdersService,
    getOrderByIdService,
    cancelOrderService,
    updateOrderStatusService
} from "./order.service.js";


// Create Order
const createOrder = async (req, res, next) => {
    try {
        const userID = req.user.userID;
        const { discountCode } = req.body;

        const order = await createOrderService(userID, discountCode);

        res.status(201).json({
            status: "success",
            message: "Order created successfully",
            data: order
        });
    } catch (error) {
        next(error);
    }
};


// Get My Orders
const getMyOrders = async (req, res, next) => {
    try {
        const userID = req.user.userID;

        const orders = await getMyOrdersService(userID);

        res.status(200).json({
            status: "success",
            results: orders.length,
            data: orders
        });
    } catch (error) {
        next(error);
    }
};


// Get All Orders (Admin)
const getAllOrders = async (req, res, next) => {
    try {
        const orders = await getAllOrdersService();

        res.status(200).json({
            status: "success",
            results: orders.length,
            data: orders
        });
    } catch (error) {
        next(error);
    }
};


// Get Order By ID
const getOrderById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userID = req.user.userID;
        const role = req.user.role;

        const order = await getOrderByIdService(id, userID, role);

        res.status(200).json({
            status: "success",
            data: order
        });
    } catch (error) {
        next(error);
    }
};


// Cancel Order
const cancelOrder = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userID = req.user.userID;
        const role = req.user.role;

        const order = await cancelOrderService(id, userID, role);

        res.status(200).json({
            status: "success",
            message: "Order cancelled successfully",
            data: order
        });
    } catch (error) {
        next(error);
    }
};


// Update Order Status (Admin)
const updateOrderStatus = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const order = await updateOrderStatusService(id, status);

        res.status(200).json({
            status: "success",
            message: "Order status updated successfully",
            data: order
        });
    } catch (error) {
        next(error);
    }
};


export {
    createOrder,
    getMyOrders,
    getAllOrders,
    getOrderById,
    cancelOrder,
    updateOrderStatus
};




