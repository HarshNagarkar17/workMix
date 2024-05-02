import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";
import config from "../config/config.js";
import { createAccessToken } from "../services/token.service.js";

export const refreshAccessToken = async (req, res) => {
    try {
        const token = req.body.refreshToken;
        if (!token)
            throw new Error("TokenMissing: token not found");

        const payload = await jwt.verify(token, config.JWT.SECRET);

        const user = await userModel.findById(payload.sub);

        if (!user)
            throw new Error("Unauthorized: user not found")

        const accessToken = await createAccessToken(payload.sub);
        return res.status(200).json({ accessToken })
    } catch (error) {

        let errorMessage = "An unexpected error occurred";
        let status = 403;
        if (error instanceof jwt.TokenExpiredError) {
            errorMessage = "refresh token expired"
            status = 401;
        } else if (error instanceof jwt.JsonWebTokenError) {
            errorMessage = "Invalid Token";
            status = 401;
        } else if (error.message.startsWith("Unauthorized:")) {
            status = 401;
            errorMessage = error.message
        } else if (error.message.startsWith("TokenMissing:")) {
            status = 400;
            errorMessage = error.message
        }
        console.log(error.message)
        return res.status(status).json({ error: errorMessage })
    }
}