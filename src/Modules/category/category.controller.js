import { createCategoryService, getAllCategoriesService, getCategoryByIdService, updateCategoryService, deleteCategoryService } from './category.service.js';

const createCategory = async (req, res, next) => {
    try {
        const categoryData = await createCategoryService(req.body);
        res.status(201).json(categoryData);
    } catch (error) {
        next(error);
    }
};

const getAllCategories = async (req, res, next) => {
    try {
        const categoryData = await getAllCategoriesService();
        res.status(200).json(categoryData);
    } catch (error) {
        next(error);
    }
};


const getCategoryById = async (req, res, next) => {
    try {
        const categoryData = await getCategoryByIdService(req.params.id);
        if (!categoryData) {
            return res.status(404).json({ message: "Category not found" });
        }
        res.status(200).json(categoryData);
    } catch (error) {
        next(error);
    }
};


const updateCategory = async (req, res, next) => {
    try {
        const categoryData = await updateCategoryService(req.params.id, req.body);
        if (!categoryData) {
            return res.status(404).json({ message: "Category not found" });
        }
        res.status(200).json(categoryData);
    } catch (error) {
        next(error);
    }
};

const deleteCategory = async (req, res, next) => {
    try {
        const categoryData = await deleteCategoryService(req.params.id);
        if (!categoryData) {
            return res.status(404).json({ message: "Category not found" });
        }
        res.status(200).json({ message: "Category deleted successfully" });
    } catch (error) {
        next(error);
    }
};



export { createCategory, getAllCategories, getCategoryById, updateCategory, deleteCategory };