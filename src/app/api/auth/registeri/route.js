import { connectDB } from "../../../lib/mongodb";
import User from "../../../lib/models/User";


import bcrypt from "bcryptjs";
import{NextResponse} from "next/server";

export async function POST(req){
    try{
        await connectDB();
        const {fname,lname,email,password}=await req.json();
     

        const existingUser=await User.findOne({email});
        if(existingUser){
            return NextResponse.json({error:"USer already exist"},{status:400});

        }

        const hashedPassword=await bcrypt.hash(password,10);

        const newUser= new User({fname,lname,email,password:hashedPassword});
        await newUser.save();

        return NextResponse.json({message:"User registered successfully"},{status:200});


    }
    catch(error){
        return NextResponse.json({error:error.message},{status:500});
    }
    
}