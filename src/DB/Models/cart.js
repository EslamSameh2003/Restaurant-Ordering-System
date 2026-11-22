import sequelize from "../Connection.js";
import { DataTypes } from "sequelize";
import User from "./user.js";

const Cart = sequelize.define("cart", {

    id: {

        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    userID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        references: {
            model: User,
            key: "id"
        }
    }


})

export default Cart;
