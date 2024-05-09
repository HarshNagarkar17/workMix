import { fileURLToPath } from "url";
import userModel from "../models/user.model.js";
import { authService, tokenService } from "../services/index.js";
import path, {dirname} from "path"
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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

export const getUser = async (req, res) => {
    try {
        const user = await userModel.findById(req.user._id);
        if (!user)
            throw new Error("user not found");
        
        if(user.profileImage.trim() === "")
            return res.status(200).json({user})
        
        const imgSrc = path.join(__dirname, "../uploads/profile-images/", user.profileImage);
        const imageData = await fs.readFileSync(imgSrc, { encoding: "base64" });
        const img = `data:image/jpeg;base64,${imageData}`;
        
        return res.status(200).json({ user, img });
    } catch (error) {
        console.log({ error });
        return res.status(400).json({ error: error.message });
    }
}
