import workModel from "../models/work.model.js";

export const createArticle = async(data) => {
    return workModel.create(data);
}