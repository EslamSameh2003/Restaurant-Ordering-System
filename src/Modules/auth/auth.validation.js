import Joi from "joi"; // Import the Joi library for data validation




// Define a schema for user registration validation
const registerSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(), //constraints for username
  email: Joi.string().email().required(), 
  password: Joi.string().min(8).required(),
  phone: Joi.string().pattern(/^[0-9+]{8,20}$/).optional(),

}).unknown(false);

//  Define a schema for user Login validation
const loginSchema=Joi.object({
  email:Joi.string().email().required(),
  password: Joi.string().min(8).required()
}).unknown(false);








export { registerSchema,loginSchema }; // Export the schema for use in other modules








