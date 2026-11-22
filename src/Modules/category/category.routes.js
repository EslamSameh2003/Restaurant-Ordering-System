import {Router} from 'express';
import validationMiddleware from '../../Middleware/validation.middleware.js';
import { authMiddleware,adminMiddleware } from '../../Middleware/auth.middleware.js';
import { createCategorySchema, updateCategorySchema } from './category.validation.js';
import { createCategory, updateCategory, deleteCategory, getAllCategories, getCategoryById } from './category.controller.js';


const router = Router(); // Create a new router instance


router.post('/',authMiddleware,adminMiddleware,validationMiddleware(createCategorySchema),createCategory); 
router.patch('/:id',authMiddleware,adminMiddleware,validationMiddleware(updateCategorySchema),updateCategory);
router.delete('/:id',authMiddleware,adminMiddleware,deleteCategory); 
router.get('/',authMiddleware,getAllCategories); 
router.get('/:id',authMiddleware,getCategoryById); 





export default router;