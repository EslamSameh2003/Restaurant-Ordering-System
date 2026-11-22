import { DataTypes } from "sequelize";
import sequelize from "../Connection.js";


const User=sequelize.define("user",{
 id:{
    type:DataTypes.INTEGER,
    primaryKey:true,
    autoIncrement:true
 },
 username:{
    type:DataTypes.STRING,
    unique:true,
    allowNull:false
 },
 email:{
    type:DataTypes.STRING,
    unique:true,
    allowNull:false
 },
 password:{
    type:DataTypes.STRING,
    required:true,
    allowNull:false
 },
 phone:{
    type:DataTypes.STRING,
    unique:true,
    allowNull:true
 },

role: {
    type: DataTypes.ENUM("admin", "customer"),
    defaultValue: "customer",
    allowNull: false
},
 isActive:{
    type:DataTypes.BOOLEAN,
    defaultValue:true
 }


});


export default User;

















