import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import Doctor from "@/app/lib/models/Doctor";
import { connectDB } from "@/app/lib/mongodb";

export async function GET() {
  try {
    await connectDB();

    const cookieStore = cookies();
    const doctorCookie = cookieStore.get("Doctor");

    if (!doctorCookie) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const { email } = JSON.parse(doctorCookie.value);
    const doctor = await Doctor.findOne({ email }).select("-password");

    if (!doctor) {
      return NextResponse.json({ error: "Doctor not found" }, { status: 404 });
    }

    return NextResponse.json({ data: doctor });
  } catch (err) {
    console.error("Server error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
