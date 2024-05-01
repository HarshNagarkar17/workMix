import jwt from "jsonwebtoken";
import config from "../config/config.js";
import userModel from "../models/user.model.js";

export const verifyUser = async (req, res, next) => {
    const tokens = req.headers.authorization;
    try {
        if (!tokens || !tokens.startsWith("Bearer "))
            throw new Error("Unauthorized: No token provided")

        const accessToken = tokens.split(" ")[1];

        const payload = await jwt.verify(accessToken, config.JWT.SECRET);
        console.log({payload})
        const user = await userModel.findById(payload.sub)
        if(!user)
            throw new Error("user not found");
        req.user = user;
        next();
    } catch (error) {
        let errorMessage = "An unexpected error occurred";
        let statusCode = 403;

        if (error instanceof jwt.TokenExpiredError) {
            errorMessage = "Token expired";
            statusCode = 401; 
        } else if (error instanceof jwt.JsonWebTokenError) {
            errorMessage = "Invalid token";
            statusCode = 401; 
        } else if (error.message.startsWith("Unauthorized")) {
            statusCode = 401; 
            errorMessage = error.message;
        }

        console.error("Error in verifyUser middleware:", error);
        return res.status(statusCode).json({ error: errorMessage });
    }
}
