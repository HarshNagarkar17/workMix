import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        trim:true
    }
},{
    timestamps:true
});

userSchema.pre("save", async function(next){
    this.password = await bcrypt.hash(this.password,8);
    next();
})

/**
 * @typedef User
 */
const userModel = mongoose.models.users || mongoose.model("Users",userSchema);
export default userModel;