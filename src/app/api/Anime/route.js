import { dbConnect } from "@/src/lib/mongodb";
import AnimeModel from "@/model/anime";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    await dbConnect();

    // Extract the page query parameter
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);

    const limit = 24;
    const skip = (page - 1) * limit;

    const totalMovies = await AnimeModel.countDocuments({
      title: { $exists: true },
    });
    const totalPages = Math.ceil(totalMovies / limit);

    const links = await AnimeModel.find({}, {title: 1, images: 1, _id: 1})
      .select("-__v")
      .skip(skip)
      .limit(limit)
      .lean();

    return NextResponse.json({ success: true, data: links, totalPages });
  } catch (error) {
    console.error("Error fetching movies:", error);
    return NextResponse.json({ success: false });
  }
};
