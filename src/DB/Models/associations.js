import User from "./user.js";
import Cart from "./cart.js"
import Order from "./order.js"
import Category from "./category.js"
import Food from "./food.js";
import CartItem from "./cartitem.js"
import OrderItem from "./orderitem.js";
import Discount from "./discount.js"

// User → Cart
User.hasOne(Cart,{
    foreignKey:"userID"
})

Cart.belongsTo(User,{
    foreignKey:"userID"
})


// User → Order
User.hasMany(Order,{
    foreignKey:"userID"
})

Order.belongsTo(User,{
    foreignKey:"userID"
})

// Category → Food
Category.hasMany(Food, {
    foreignKey: "categoryID"
});

Food.belongsTo(Category, {
    foreignKey: "categoryID"
});

// Cart → CartItem
Cart.hasMany(CartItem, {
    foreignKey: "cartID"
});

CartItem.belongsTo(Cart, {
    foreignKey: "cartID"
});


//// Food → CartItem
Food.hasMany(CartItem, {
    foreignKey: "foodID"
});

CartItem.belongsTo(Food, {
    foreignKey: "foodID"
});


/// Order → OrderItem
Order.hasMany(OrderItem, {
    foreignKey: "orderID"
});

OrderItem.belongsTo(Order, {
    foreignKey: "orderID"
});


/// Food → OrderItem
Food.hasMany(OrderItem, {
    foreignKey: "foodID"
});

OrderItem.belongsTo(Food, {
    foreignKey: "foodID"
});

/// Discount → Order
Discount.hasMany(Order, {
    foreignKey: "discountID"
});

Order.belongsTo(Discount, {
    foreignKey: "discountID"
});


















