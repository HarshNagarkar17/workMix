import axiosInstance from "@/utils/axios";

export const registerUser = async (userData:any, profileImage:any) => {
    const data = new FormData();
    data.append("email", userData.email)
    data.append("password", userData.password)
    data.append("username",userData.username);
    data.append("profileImage", profileImage)
    const res = await axiosInstance.post("/api/register", data, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });

    return res;
}

export const loginUser = async(values:any) => {
    const res = await axiosInstance.post("/api/login",values);
    return res;
}