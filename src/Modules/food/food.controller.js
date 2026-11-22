
import { createFoodService, getAllFoodsService, getFoodByIdService, updateFoodService, deleteFoodService } from "./food.service.js";

const createFood = async (req, res, next) => {
    try {
        const foodData = await createFoodService(req.body);
        res.status(201).json(foodData);
    } catch (error) {
       next(error); // Pass the error to the error handling middleware
    }
};

const getAllFoods = async (req, res, next) => {
    try {
        const foodData = await getAllFoodsService();
        res.status(200).json(foodData);
    } catch (error) {
        next(error); // Pass the error to the error handling middleware
    }
};       


const getFoodById = async (req, res, next) => {
    try {
        const foodData = await getFoodByIdService(req.params.id);
        if (!foodData) {
            return res.status(404).json({ message: "Food not found" });
        }
        res.status(200).json(foodData);
    } catch (error) {
       next(error); // Pass the error to the error handling middleware
    }
};

const updateFood = async (req, res, next) => {
    try {
        const foodData = await updateFoodService(req.params.id, req.body);  
        if (!foodData) {
            return res.status(404).json({ message: "Food not found" });
        }
        res.status(200).json(foodData);
    } catch (error) {
        next(error); // Pass the error to the error handling middleware
    }
};

const deleteFood = async (req, res, next) => {
    try {
        const foodData = await deleteFoodService(req.params.id);    
        if (!foodData) {
            return res.status(404).json({ message: "Food not found" });
        }
        res.status(200).json(foodData);
    } catch (error) {
        next(error); // Pass the error to the error handling middleware
    }
};



export { createFood, getAllFoods, getFoodById, updateFood, deleteFood };
