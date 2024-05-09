import axiosInstance from "@/utils/axios"

export const createArticle = async(data:any) => {
    const res = await axiosInstance.post("/work/article", data);
    return res;
}