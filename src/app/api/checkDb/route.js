import { dbConnect } from "@/src/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
    await dbConnect();
    return new NextResponse("MongoDB connected");
    // return NextResponse.json({ message: "MongoDB connected" });
}