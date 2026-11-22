import sequelize from "../Connection.js";
import { DataTypes } from "sequelize";


const Discount = sequelize.define("discount", {

    id: {

        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },

    value: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    minOrderAmount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
         defaultValue: 0
    },
    maxDiscount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true
    },
    type:{
        type:DataTypes.ENUM("Percentage","Fixed"),
        allowNull: false


    },
    expiresAt: {
        type: DataTypes.DATE,
        allowNull: true
    },
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
  

})


export default Discount;