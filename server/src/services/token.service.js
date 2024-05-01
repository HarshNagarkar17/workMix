import jwt from "jsonwebtoken";
import moment from "moment";
import config from "../config/config.js";

export const generateToken = (userId,expiresIn) =>{
    const payload = {
        sub:userId,
        iat:moment().unix(),
        exp:expiresIn.unix(),
    }

    return jwt.sign(payload,config.JWT.SECRET);
}
export const createTokens = async(user) => {
    const accessTokenExpireTime = moment().add(15,"minutes");
    const accessToken = await generateToken(user,accessTokenExpireTime)

    const refreshTokenExpireTime = moment().add(2,"days");
    const refreshToken = await generateToken(user,refreshTokenExpireTime);
    return {
        accessToken,
        refreshToken
    }
}