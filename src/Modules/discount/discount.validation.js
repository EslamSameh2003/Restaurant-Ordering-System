
import Joi from "joi";

// Create Discount Schema
const createDiscountSchema = Joi.object({
    code: Joi.string().trim().uppercase().min(2).max(50).required(),

    value: Joi.number().positive().required()
        .when("type", {
            is: "Percentage",
            then: Joi.number().max(100)
        }),

    minOrderAmount: Joi.number().min(0).default(0),
    maxDiscount: Joi.number().positive().allow(null).optional(),
    type: Joi.string().valid("Percentage", "Fixed").required(),
    expiresAt: Joi.date().allow(null).optional(),
    isActive: Joi.boolean().default(true)
}).unknown(false);

// Update Discount Schema
const updateDiscountSchema = createDiscountSchema.fork(
    ["code", "value", "minOrderAmount", "maxDiscount", "type", "expiresAt", "isActive"],
    (schema) => schema.optional()
).min(1).prefs({ noDefaults: true }).unknown(false);

// Discount ID Schema
const discountIdSchema = Joi.object({
    id: Joi.number().integer().positive().required()
}).unknown(false);

export {
    createDiscountSchema,
    updateDiscountSchema,
    discountIdSchema
};
