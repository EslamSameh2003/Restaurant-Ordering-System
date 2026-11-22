import Food from "../../DB/Models/food.js"; // Import the Food model for database operations
import Category from "../../DB/Models/category.js"; // Import the Category model for database operations
import AppError from "../../utils/AppError.js"; // Import the custom AppError class for error handling



const createFoodService = async (foodData) => {

    const category = await Category.findByPk(foodData.categoryID); // Find the associated category by its ID
    if (!category) {
        throw new AppError("Category not found", 404);
    }

    if (!category.isActive) {
        throw new AppError("Category is inactive", 400);
    }
    const existingFood = await Food.findOne({ where: { name: foodData.name } }); // Check if a food item with the same name already exists
    if (existingFood) {
        throw new AppError("Food with the same name already exists", 409); // Throw an AppError if a food item with the same name exists
    }
    const food = await Food.create(foodData); // Create a new food item in the database

    return food; // Return the created food item
};

const getAllFoodsService = async () => {

    const foods = await Food.findAll();
    return foods; // Return all food items from the database
};

const getFoodByIdService = async (foodId) => {

    const food = await Food.findByPk(foodId);
    return food; // Return the found food item
};



const updateFoodService = async (foodId, foodData) => {
    const food = await Food.findByPk(foodId);
    if (!food) {
        return null; // Return null if the food item does not exist
    }
    if (foodData.categoryID !== undefined) {
        const category = await Category.findByPk(foodData.categoryID);
        if (!category) {
            throw new AppError("Category not found", 404);
        }

        if (!category.isActive) {
            throw new AppError("Category is inactive", 400);
        }
    }
    if (foodData.name !== undefined && foodData.name !== food.name) {
        const existingFood = await Food.findOne({ where: { name: foodData.name } });
        if (existingFood) {
            throw new AppError("Food with the same name already exists", 409);
        }
    }

    await food.update(foodData);
    return food; // Return the updated food item
};


const deleteFoodService = async (foodId) => {
    const food = await Food.findByPk(foodId);
    if (!food) {
        return null; // Return null if the food item does not exist
    }
    await food.destroy();
    return food; // Return the deleted food item
};

export { createFoodService, getAllFoodsService, getFoodByIdService, updateFoodService, deleteFoodService }; // Export the service functions for use in other modules

