import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import Doctor from "@/app/lib/models/Doctor";

export async function GET(){
    try{
        await connectDB();
        const doctor= await Doctor.find();
        return NextResponse.json({success:true,data:doctor});

    }
    catch{
        return NextResponse.json({success:false,message:error.message},{status:500}); 
    }

}
