import { workService } from "../services/index.js";

export const createArticle = async(req,res) => {
    try {
        const {title,description,content} = req.body;
        const data = {title,description,content,byUser:req.user._id};
        const work = await workService.createArticle(data);
        return res.json({work});
    } catch (error) {
        return res.status(400).json({error:error.message})
    }
}