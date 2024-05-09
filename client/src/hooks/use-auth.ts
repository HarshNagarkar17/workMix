import { removeTokensFromLocalStorage, setTokensToLocalStorage } from "@/service/token.service";
import { RootState } from "@/store";
import { setAuthTokens } from "@/store/slices/AuthSlice";
import { resetState } from "@/store/slices/ProfileSlice";
import { useDispatch, useSelector } from "react-redux";

export const useAuth = () => {
    const { token, refresh_token } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();

    const setTokens = (tokens: string) => {
        dispatch(setAuthTokens(tokens));
        setTokensToLocalStorage(tokens);
    }

    const resetTokens = () => {
        dispatch(resetState())
        removeTokensFromLocalStorage();
    };
    
    return {token,refresh_token,setTokens,resetTokens};
}