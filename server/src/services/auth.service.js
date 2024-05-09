import userModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import _ from "lodash";
import { getTemplateProfilePicture, getUserProfilePicture } from "./user.service.js";

export const createUser = async (userData,file) => {
    const { email, password,username } = userData;
    const data = {
        username,
        email,
        password,
        profileImage: file?.filename || ""
    }
    const isUserExist = await userModel.findOne({email});
    if (isUserExist)
        throw new Error("User already exist");

    const newUser = await userModel.create(data);
    let user = _.pick(newUser,['username','email','_id']);
    if(newUser?.profileImage.trim() !== ""){
        user.profileImage = await getUserProfilePicture(newUser);
    }else{
        user.profileImage = await getTemplateProfilePicture();
    }
    return user;
}

export const loginUser = async (data) => {
    const { email, password } = data;

    const foundUser = await userModel.findOne({ email });
    if (!foundUser)
        throw new Error("Invalid email or password");

    if (!(await bcrypt.compare(password, foundUser.password)))
        throw new Error("Invalid email or password");

    let user = _.pick(foundUser,['username','email','_id']);
    if(foundUser?.profileImage.trim() !== ""){
        user.profileImage = await getUserProfilePicture(foundUser);
    }else{
        user.profileImage = await getTemplateProfilePicture();
    }
    // user = _.pick(foundUser,["username","email","_id"]);
    console.log({user})
   return user;
}
