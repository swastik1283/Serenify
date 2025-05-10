import { connectDB } from "../../../lib/mongodb";
import Doctor from "@/app/lib/models/Doctor";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();
    const formData = await req.formData();

    const fname = formData.get("fname");
    const lname = formData.get("lname");
    const email = formData.get("email");
    const password = formData.get("password");
    const metaid = formData.get("metaid");
    const file = formData.get("file");
    const fees=formData.get("fees");
    const role=formData.get("role");
   
    if (!(file instanceof Blob)) {
      return NextResponse.json({ error: 'File is required' }, { status: 400 });
    }
    const buffer = Buffer.from(await file.arrayBuffer());
    const contentType = file.type;

    const existingUser = await Doctor.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new Doctor({
      fname,
      lname,
      email,
      password: hashedPassword,
      metaid,
      fees,
      role,
      ValidQualification: {
        data: buffer,
        contentType: contentType,
      },
      
    });

    await newUser.save();

    return NextResponse.json({ message: "Doctor registered successfully" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
