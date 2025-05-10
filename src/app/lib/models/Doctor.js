import mongoose from "mongoose";

const DoctorSchema= new mongoose.Schema({
    
    fname:{type:String,required:true},
    lname:{type:String,required:true},
    email:{type:String,unique:true,required:true},
    password:{type:String,required:true},
    metaid:{type:String,required:true},
    ValidQualification:{
        data:Buffer,
        contentType:String},
    fees:{type:String,required:true},
    role:{type:String,required:true}
},
{timestamps:true});

export default mongoose.models.Doctor || mongoose.model("Doctor",DoctorSchema)
