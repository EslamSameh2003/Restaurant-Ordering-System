import {Router} from 'express';
import { createFood, getAllFoods, getFoodById, updateFood, deleteFood } from './food.controller.js';
import { createFoodSchema, updateFoodSchema } from './food.validation.js';
import validationMiddleware from '../../Middleware/validation.middleware.js';
import { authMiddleware,adminMiddleware } from '../../Middleware/auth.middleware.js';


const router = Router(); // Create a new router instance

router.post('/',authMiddleware,adminMiddleware,validationMiddleware(createFoodSchema),createFood);
router.patch('/:id',authMiddleware,adminMiddleware,validationMiddleware(updateFoodSchema),updateFood);
router.delete('/:id',authMiddleware,adminMiddleware,deleteFood);
router.get('/',authMiddleware,getAllFoods);
router.get('/:id',authMiddleware,getFoodById);







export default router;// Create a new router instance
