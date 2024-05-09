import { RootState } from "@/store";
import { setProfile } from "@/store/slices/ProfileSlice";
import { useDispatch,useSelector } from "react-redux";


export function useProfile(){
    const dispatch = useDispatch();
    const {username,email,profileImage} = useSelector((state:RootState) => state.profile);

    const setUserProfile = (data:any) => {
        console.log({data})
        dispatch(setProfile(data));
    }

    return {setUserProfile,username,email,profileImage}
}