import {createUser,loginUser} from "./auth.service.js"
import {createTokens} from "./token.service.js";

export const authService = {createUser,loginUser}
export const tokenService = {createTokens}