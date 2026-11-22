import {Router} from 'express';
import validationMiddleware from '../../Middleware/validation.middleware.js';
import { registerSchema,loginSchema } from './auth.validation.js';
import { register,login } from './auth.controller.js';
import { authMiddleware,adminMiddleware } from '../../Middleware/auth.middleware.js';


const router = Router(); // Create a new router instance

//router.get('/adminpanel',authMiddleware,adminMiddleware)
router.post('/register',validationMiddleware(registerSchema),register); // Define a POST route for user registration with validation middleware
router.post('/login',validationMiddleware(loginSchema),login);







export default router;