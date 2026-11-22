import Category from "../../DB/Models/category.js";



const createCategoryService = async (categoryData) => {
    const category = await Category.create(categoryData);
    return category;
};

const getAllCategoriesService = async () => {
    const categories = await Category.findAll();
    return categories;
};

const getCategoryByIdService = async (categoryId) => {
    const category = await Category.findByPk(categoryId);
    return category;
};


const updateCategoryService = async (categoryId, categoryData) => {
    const category = await Category.findByPk(categoryId);
    if (!category) {
        return null;
    }   
    await category.update(categoryData);
    return category;
};


const deleteCategoryService = async (categoryId) => {
    const category = await Category.findByPk(categoryId);
    if (!category) {
        return null;
    }
    await category.destroy();
    
    return category;
};


export { createCategoryService, getAllCategoriesService, getCategoryByIdService, updateCategoryService, deleteCategoryService };

