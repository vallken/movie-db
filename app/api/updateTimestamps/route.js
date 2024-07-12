// pages/api/update-timestamps.js
import { dbConnect } from "@/lib/mongodb";
import Movie from "@/model/movie";
import { NextResponse } from "next/server";

export async function GET(req) {
  await dbConnect();

  try {
    const result = await Movie.updateMany(
      {},
      { $set: { updatedAt: new Date() } }
    );
    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
