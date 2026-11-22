import {getCartItemsService,addToCartService,updateCartItemService,removeCartItemService,clearCartService}from "./cart.service.js"



const getCartItems = async (req, res, next) => {    
    try {
        const userId = req.user.userID;
        const cartItems = await getCartItemsService(userId);
        res.status(200).json(cartItems);
    } catch (error) {
        next(error);
    }   
};

const addToCart = async (req, res, next) => {
    try {
        const userId = req.user.userID;
        const { foodID, quantity } = req.body;
        const cartItem = await addToCartService(userId, foodID, quantity);
        res.status(201).json(cartItem);
    } catch (error) {
        next(error);
    }
};

const updateCartItem = async (req, res, next) => {
    try {
        const userId = req.user.userID; 
        const { foodID } = req.params;
        const { quantity } = req.body;
        const updatedCartItem = await updateCartItemService(userId, foodID, quantity);
        res.status(200).json(updatedCartItem);
    } catch (error) {
        next(error);
    }
};

const removeCartItem = async (req, res, next) => {
    try {
        const userId = req.user.userID; 
        const { foodID } = req.params;
        await removeCartItemService(userId, foodID);
        res.status(200).json({ message: "Item removed from cart" });
    } catch (error) {
        next(error);
    }
};

const clearCart = async (req, res, next) => {
    try {
        const userId = req.user.userID;
        await clearCartService(userId);
        res.status(200).json({ message: "Cart cleared" });
    } catch (error) {
        next(error);
    }   
};

export { getCartItems, addToCart, updateCartItem, removeCartItem, clearCart };







