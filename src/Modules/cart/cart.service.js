
import Cart from "../../DB/Models/cart.js";
import CartItem from "../../DB/Models/cartitem.js";
import Food from "../../DB/Models/food.js";
import AppError from "../../utils/AppError.js";

// Get Cart Items
const getCartItemsService = async (userId) => {
    const cart = await Cart.findOne({
        where: { userID: userId },
        include: [
            {
                model: CartItem,
                include: [Food]
            }
        ]
    });

    if (!cart) {
        throw new AppError("Cart not found", 404);
    }

    return cart;
};

// Add Food to Cart
const addToCartService = async (userId, foodID, quantity) => {
    const foodItem = await Food.findByPk(foodID);

    if (!foodItem) {
        throw new AppError("Food item not found", 404);
    }

    if (!foodItem.isAvailable) {
        throw new AppError("Food item is not available", 400);
    }

    let cart = await Cart.findOne({
        where: { userID: userId }
    });

    // Create Cart automatically if it doesn't exist
    if (!cart) {
        cart = await Cart.create({ userID: userId });
    }

    // Check if Food already exists in Cart
    const existingCartItem = await CartItem.findOne({
        where: {
            cartID: cart.id,
            foodID: foodID
        }
    });

    if (existingCartItem) {
        await existingCartItem.increment("quantity", { by: quantity });
        return existingCartItem.reload();
    }

    const newCartItem = await CartItem.create({
        cartID: cart.id,
        foodID: foodID,
        quantity: quantity
    });

    return newCartItem;
};

// Update Cart Item Quantity
const updateCartItemService = async (userId, foodID, quantity) => {
    const cart = await Cart.findOne({
        where: { userID: userId }
    });

    if (!cart) {
        throw new AppError("Cart not found", 404);
    }

    const cartItem = await CartItem.findOne({
        where: {
            cartID: cart.id,
            foodID: foodID
        }
    });

    if (!cartItem) {
        throw new AppError("Item not found in cart", 404);
    }

    await cartItem.update({ quantity });

    return cartItem;
};

// Remove Cart Item
const removeCartItemService = async (userId, foodID) => {
    const cart = await Cart.findOne({
        where: { userID: userId }
    });

    if (!cart) {
        throw new AppError("Cart not found", 404);
    }

    const cartItem = await CartItem.findOne({
        where: {
            cartID: cart.id,
            foodID: foodID
        }
    });

    if (!cartItem) {
        throw new AppError("Item not found in cart", 404);
    }

    await cartItem.destroy();

    return { message: "Item removed from cart" };
};

// Clear Cart
const clearCartService = async (userId) => {
    const cart = await Cart.findOne({
        where: { userID: userId }
    });

    if (!cart) {
        throw new AppError("Cart not found", 404);
    }

    await CartItem.destroy({
        where: { cartID: cart.id }
    });

    return { message: "Cart cleared" };
};

export {
    getCartItemsService,
    addToCartService,
    updateCartItemService,
    removeCartItemService,
    clearCartService
};
