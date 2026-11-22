import User from "../../DB/Models/user.js";
import bcrypt from "bcrypt";
import { Op } from "sequelize";
import jwt from "jsonwebtoken";



const registerUser = async (userData) => {

    const existingUser = await User.findOne({
        where: {
            [Op.or]: [
                { username: userData.username },
                { email: userData.email }
            ]
        }
    });

    if (existingUser) {
        const error = new Error("User already exists");
        error.statusCode = 409;
        throw error;
    }
    const hashedPassword = await bcrypt.hash(userData.password, 12);
    const user = await User.create({
        username: userData.username,
        email: userData.email,
        password: hashedPassword,
        phone: userData.phone
    });

    const { password, ...safeUser } = user.toJSON(); // Exclude the password from the returned user object
    console.log('User created:', safeUser);

    return safeUser;

};



const loginUser = async (userData) => {

    const existingUser = await User.findOne({
        where: {
            email: userData.email
        }
    });
    if (!existingUser) {
        const error = new Error("Invalid Email or password");
        error.statusCode = 401;
        throw error;
    }
    const isPasswordValid = await bcrypt.compare(userData.password, existingUser.password);
    if (!isPasswordValid) {
        const error = new Error("Invalid Email or password");
        error.statusCode = 401;
        throw error;
    }

    if (!existingUser.isActive) { // Check if the user account is active
        const error = new Error("Account is inactive");
        error.statusCode = 403;
        throw error;
    }

    const tokenUser = jwt.sign( // Generate a JWT token for the authenticated user
        {
            userID: existingUser.id,
            role: existingUser.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES_IN
        }
    );


    const { password, ...UserData } = existingUser.toJSON(); // Exclude the password from the returned user object
    console.log('UserData :', UserData,"Token:", tokenUser);

    return {

        UserData,
        tokenUser
    };

}












export { registerUser, loginUser };
