import {createSlice} from "@reduxjs/toolkit";
import { RootState } from "..";

interface AuthState{
    token:string | undefined;
    refresh_token:string | undefined;
}

const initialState:AuthState = {
    token:undefined,
    refresh_token:undefined
}

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        resetState: ()=> initialState,
        setAuthTokens:(state,action)=>{
            const {accessToken,refreshToken} = action.payload;
            state.token = accessToken;
            state.refresh_token = refreshToken;
        }
    }
}) 

export const {resetState,setAuthTokens} = authSlice.actions;
export default authSlice.reducer;
export const selectToken = (state:RootState) => state.auth.token;
export const selectRefreshToken = (state:RootState) => state.auth.refresh_token;