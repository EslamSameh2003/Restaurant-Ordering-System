import Joi from "joi";

// Add Food to Cart
const addToCartSchema = Joi.object({
    foodID: Joi.number().integer().positive().required(),
    quantity: Joi.number().integer().positive().default(1)
}).unknown(false);

// Update Cart Item Quantity
const updateCartItemSchema = Joi.object({
    quantity: Joi.number().integer().positive().required()
}).unknown(false);



export {
    addToCartSchema,
    updateCartItemSchema
};


