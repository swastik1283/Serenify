import User from "@/app/lib/models/User";
import { connectDB } from "@/app/lib/mongodb";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        await connectDB();
        console.log("✅ Database Connected");

        // Read request body safely
        let body;
        try {
            body = await req.json();
        } catch (error) {
            console.error("❌ Error Parsing JSON:", error.message);
            return NextResponse.json({ error: "Invalid JSON format" }, { status: 400 });
        }

        // Validate required fields
        const { email, password } = body || {};
        if (!email || !password) {
            console.log("❌ Missing email or password");
            return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
        }

        console.log("📩 Received Email:", email);
        console.log("🔑 Received Password:", password);

        // Find the user in DB
        const user = await User.findOne({ email });
        if (!user) {
            console.log("❌ No user found");
            return NextResponse.json({ error: "No user found" }, { status: 404 });
        }

        console.log("🔍 User found:", user);

        // Check if password matches
        console.log("🔄 Checking password...");
        const isMatch = await bcrypt.compare(password, user.password);
        console.log("🔄 Password Match:", isMatch);

        if (!isMatch) {
            console.log("❌ Invalid Credentials");
            return NextResponse.json({ error: "Invalid Credentials" }, { status: 401 });
        }

        // Set Cookie
        const cookieStore =  await cookies();
        console.log("🍪 Setting Cookie...");
        cookieStore.set("user", JSON.stringify({ id: user._id, email: user.email }), {
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 7, // 7 days
        });

        console.log("✅ User logged in successfully!");
        return NextResponse.json({ message: "User Logged In" }, { status: 200 });

    } catch (error) {
        console.error("❌ Server Error:", error.message);
        return NextResponse.json({ error: "Server Error" }, { status: 500 });
    }
}
