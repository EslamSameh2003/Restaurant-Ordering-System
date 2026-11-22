import sequelize from "../Connection.js";
import { DataTypes } from "sequelize";
import Food from "./food.js";
import Order from "./order.js";

const OrderItem = sequelize.define("orderItem", {

    id: {

        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    foodName: {
        type: DataTypes.STRING,
        allowNull: false
    },

    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
     total: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },

    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    },

    orderID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Order,
            key: "id",

        }
    },

    foodID: {
        type: DataTypes.INTEGER,
        allowNull: true,
        onDelete: "SET NULL",
        references: {
            model: Food,
            key: "id",

        }
    },

})


export default OrderItem;