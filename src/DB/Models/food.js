import sequelize from "../Connection.js";
import { DataTypes } from "sequelize";
import Category from "./category.js";

const Food = sequelize.define("food", {

    id: {

        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    image: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,


    },
    isAvailable: {
        type: DataTypes.BOOLEAN,
        defaultValue: true


    },
    categoryID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Category,
            key: "id"
        }
    }


})


export default Food;