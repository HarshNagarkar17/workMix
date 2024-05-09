import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";

interface ProfileState{
    username:string | undefined;
    email:string | undefined;
    profileImage:string |undefined;
}

const initialState:ProfileState = {
    username:undefined,
    email:undefined,
    profileImage:undefined
}

const profileSlice = createSlice({
    name:"profile",
    initialState,
    reducers:{
        resetState: ()=>initialState,
        setProfile: (state,action) => {
            const {username,email,profileImage} = action.payload;
            state.username = username;
            state.email = email;
            state.profileImage = profileImage;
        }
    }
})

export const {resetState,setProfile} = profileSlice.actions;
export default profileSlice.reducer;

export const getUserProfile = (state:RootState) => state.profile;