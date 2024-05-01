import userModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import _ from "lodash";

export const createUser = async (user) => {
    const { username, email, password } = user;
    const isUserExist = await userModel.findOne({ email });
    if (isUserExist)
        throw new Error("User already exist");
    return userModel.create({ username, email, password });
}

export const loginUser = async (data) => {
    const { email, password } = data;

    const foundUser = await userModel.findOne({ email });
    if (!foundUser)
        throw new Error("Invalid email or password");

    if (!(await bcrypt.compare(password, foundUser.password)))
        throw new Error("Invalid email or password");
   const user = _.pick(foundUser,["username","email","_id"]);
   return user;
}
