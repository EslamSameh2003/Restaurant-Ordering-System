import Joi from "joi"; // Import the Joi library for data validation

// Define a schema for Food validation

const createFoodSchema = Joi.object({
    name: Joi.string().min(2).max(40).required(), //constraints for food name
    description: Joi.string().min(2).max(200).optional(),
    price: Joi.number().positive().required(), //constraints for food price
    image: Joi.string().uri().optional(),
    categoryID: Joi.number().positive().integer().required() //constraints for category ID
}).unknown(false);

const updateFoodSchema = createFoodSchema.fork(
    ['name', 'description', 'price', 'image', 'categoryID'],
     (schema) => schema.optional()
).min(1); // Make all fields optional for update




export { createFoodSchema, updateFoodSchema }; // Export the schemas for use in other modules