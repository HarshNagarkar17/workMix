import mongoose from "mongoose";

const workSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String,
        required:true,
        trim:true
    },
    content:{
        type:String,
        required:true,
        trim:true
    },
    byUser:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Users'
    }
})

/**
 * @typedef Work
 */
const workModel = mongoose.models.work || mongoose.model("Work", workSchema);
export default workModel;