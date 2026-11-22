import Joi from "joi"; // Import the Joi library for data validation




// Define a schema for Category validation
const createCategorySchema = Joi.object({
  name: Joi.string().min(2).max(40).required(), //constraints for username
  description: Joi.string().min(2).max(200).optional(),
  image: Joi.string().uri().optional()
}).unknown(false);


const updateCategorySchema = createCategorySchema.fork(
    ['name', 'description', 'image'],
     (schema) => schema.optional()
).min(1); // Make all fields optional for update


export { createCategorySchema, updateCategorySchema }; // Export the schemas for use in other modules




