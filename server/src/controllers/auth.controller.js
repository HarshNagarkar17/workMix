import userModel from "../models/user.model.js";
import { authService, tokenService } from "../services/index.js";

export const register = async(req,res) => {
    try {
        const user = await authService.createUser(req.body,req.file);
        const tokens = await tokenService.createTokens(user._id);
        return res.status(200).json({user,tokens});
    } catch (error) {
        return res.status(400).json({error:error.message})
    }
}


export const login = async(req,res) => {
    try {
        const user = await authService.loginUser(req.body);
        const tokens = await tokenService.createTokens(user._id);
        return res.status(200).json({user,tokens});
    } catch (error) {
        return res.status(400).json({error:error.message});
    }
}


export const getUser = async(req,res) => {
    try {
        const user = await userModel.findById(req.user._id);
        if(!user)
            throw new Error("user not found");
        return res.status(200).json({user})
    } catch (error) {
        return res.status(400).json({error:error.message})
    }
}