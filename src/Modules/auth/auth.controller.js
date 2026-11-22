import { registerUser,loginUser } from './auth.service.js';


const register = async (req, res, next) => {
    try {
        const user = await registerUser(req.body);

        res.status(201).json({
            message: 'User registered successfully',
            user
        });
    } catch (error) {
        next(error);
    }
};


const login=async(req,res,next)=>{

    try {
        const userData=await loginUser(req.body);
         res.status(200).json({
            message: 'Login successfully',
            ...userData

        });
    }catch (error) {
        next(error);
    }

};








export { register,login };