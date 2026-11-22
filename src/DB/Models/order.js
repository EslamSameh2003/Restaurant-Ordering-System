import sequelize from "../Connection.js";
import { DataTypes } from "sequelize";
import User from "./user.js";
import Discount from "./discount.js";

const Order = sequelize.define("order", {

    id: {

        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    subtotal: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },

    total: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },

    discountAmount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0
    },

    status: {
        type: DataTypes.ENUM("Pending", "Confirmed", "Preparing", "Ready", "Delivered", "Cancelled"),
        defaultValue: "Pending",
        allowNull: false


    },
    userID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: "id",

        }
    },
    discountID: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Discount,
            key: "id",

        }
    },

    /////////////////////////////////////////////

    paymentMethod:{
        type: DataTypes.ENUM("Cash", "Online"),
        allowNull: false,
        defaultValue: "Cash"
    },

    paymentStatus: {
        type: DataTypes.ENUM("Pending", "Paid", "Failed", "Refunded"),
        allowNull: false,
        defaultValue: "Pending"
    },

    transactionID: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
    }


})


export default Order;