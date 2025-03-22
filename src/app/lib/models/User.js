import mongoose from "mongoose";

const userSchema= new mongoose.Schema({
    
    fname:{type:String,required:true},
    lname:{type:String,required:true},
    email:{type:String,unique:true,required:true},
    password:{type:String,required:true},
},{timestamps:true});

export default mongoose.models.User || mongoose.model("User",userSchema)
