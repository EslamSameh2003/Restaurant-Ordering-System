import Joi from "joi";



// Create Order Schema
const createOrderSchema = Joi.object({
    discountCode: Joi.string()
        .trim()
        .optional()
}).unknown(false);


// Order ID Params Schema
const orderIdSchema = Joi.object({
    id: Joi.number()
        .integer()
        .positive()
        .required()
}).unknown(false);


// Update Order Status Schema
const updateOrderStatusSchema = Joi.object({
    status: Joi.string()
        .valid("Confirmed", "Preparing", "Ready", "Delivered", "Cancelled")
        .required()
}).unknown(false);


export {
    createOrderSchema,
    orderIdSchema,
    updateOrderStatusSchema
};
