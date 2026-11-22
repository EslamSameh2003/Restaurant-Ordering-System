
import {
    createDiscountService,
    getAllDiscountsService,
    getDiscountByIdService,
    updateDiscountService,
    deleteDiscountService
} from "./discount.service.js";

// Create Discount
const createDiscount = async (req, res, next) => {
    try {
        const discount = await createDiscountService(req.body);

        res.status(201).json({
            status: "success",
            message: "Discount created successfully",
            data: discount
        });
    } catch (error) {
        next(error);
    }
};

// Get All Discounts
const getAllDiscounts = async (req, res, next) => {
    try {
        const discounts = await getAllDiscountsService();

        res.status(200).json({
            status: "success",
            results: discounts.length,
            data: discounts
        });
    } catch (error) {
        next(error);
    }
};

// Get Discount By ID
const getDiscountById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const discount = await getDiscountByIdService(id);

        res.status(200).json({
            status: "success",
            data: discount
        });
    } catch (error) {
        next(error);
    }
};

// Update Discount
const updateDiscount = async (req, res, next) => {
    try {
        const { id } = req.params;
        const discount = await updateDiscountService(id, req.body);

        res.status(200).json({
            status: "success",
            message: "Discount updated successfully",
            data: discount
        });
    } catch (error) {
        next(error);
    }
};

// Delete Discount
const deleteDiscount = async (req, res, next) => {
    try {
        const { id } = req.params;
        await deleteDiscountService(id);

        res.status(200).json({
            status: "success",
            message: "Discount deleted successfully"
        });
    } catch (error) {
        next(error);
    }
};

export {
    createDiscount,
    getAllDiscounts,
    getDiscountById,
    updateDiscount,
    deleteDiscount
};
