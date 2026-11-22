
import Discount from "../../DB/Models/discount.js";
import Order from "../../DB/Models/order.js";
import AppError from "../../utils/AppError.js";

// 1. Create Discount
const createDiscountService = async (data) => {
    const discount = await Discount.create(data);
    return discount;
};

// 2. Get All Discounts
const getAllDiscountsService = async () => {
    const discounts = await Discount.findAll({
        order: [["createdAt", "DESC"]]
    });

    return discounts;
};

// 3. Get Discount By ID
const getDiscountByIdService = async (id) => {
    const discount = await Discount.findByPk(id);

    if (!discount) {
        throw new AppError("Discount not found", 404);
    }

    return discount;
};

// 4. Update Discount
const updateDiscountService = async (id, data) => {
    const discount = await Discount.findByPk(id);

    if (!discount) {
        throw new AppError("Discount not found", 404);
    }

    const updatedData = {
        ...discount.toJSON(),
        ...data
    };

    if (updatedData.type === "Percentage" && updatedData.value > 100) {
        throw new AppError("Percentage discount cannot exceed 100", 400);
    }

    await discount.update(data);

    return discount;
};

// 5. Delete Discount
const deleteDiscountService = async (id) => {
    const discount = await Discount.findByPk(id);

    if (!discount) {
        throw new AppError("Discount not found", 404);
    }

    const usedOrders = await Order.count({
        where: { discountID: id }
    });

    if (usedOrders > 0) {
        await discount.update({ isActive: false });
        return { deactivated: true };
    }

    await discount.destroy();

    return { deactivated: false };
};

export {
    createDiscountService,
    getAllDiscountsService,
    getDiscountByIdService,
    updateDiscountService,
    deleteDiscountService
};
