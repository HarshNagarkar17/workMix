import {createUser,loginUser} from "./auth.service.js"
import {createTokens} from "./token.service.js";
import {createArticle} from "./work.service.js";

export const authService = {createUser,loginUser}
export const tokenService = {createTokens}
export const workService = {createArticle}