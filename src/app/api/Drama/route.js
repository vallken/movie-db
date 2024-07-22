import { dbConnect } from "@/src/lib/mongodb";
import Drama from "@/model/drama";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    await dbConnect();
    // Extract the page query parameter
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);

    const limit = 20;
    const skip = (page - 1) * limit;

    const totalDrama = await Drama.countDocuments({ title: { $exists: true } });
    const totalPages = Math.ceil(totalDrama / limit);

    const links = await Drama.find(
      {},
      { title: 1, image: 1, id: 1 }
    )
      .select("-_id -__v")
      .skip(skip)
      .limit(limit)
      .lean();

    return NextResponse.json({ success: true, data: links, totalPages });
  } catch (error) {
    console.error("Error fetching movies:", error);
    return NextResponse.json({ success: false });
  }
};
