import sequelize from "../Connection.js";
import { DataTypes } from "sequelize";



const Category=sequelize.define("category",{

    id:{

        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    description:{
        type:DataTypes.TEXT,
    },
    image: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    isActive:{
    type:DataTypes.BOOLEAN,
    defaultValue:true
 }


})

export default Category;

