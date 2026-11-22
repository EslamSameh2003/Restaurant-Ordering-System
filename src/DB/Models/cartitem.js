import sequelize from "../Connection.js";
import { DataTypes } from "sequelize";
import Food from "./food.js";
import Cart from "./cart.js";

const CartItem = sequelize.define("cartItem",{
    

    id: {

        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    },

    cartID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Cart,
            key: "id"
        }
    },
    foodID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Food,
            key: "id"
        }
    },


},
{
    indexes: [
        {
            unique: true,
            fields: ["cartID", "foodID"]
        }
    ]
}
)

export default CartItem;
