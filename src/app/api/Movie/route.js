import { dbConnect } from "@/src/lib/mongodb";
import Movie from "@/model/movie";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    await dbConnect();
    // Extract the page query parameter
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);

    const limit = 24;
    const skip = (page - 1) * limit;

    const totalMovies = await Movie.countDocuments({
      title: { $exists: true },
    });
    const totalPages = Math.ceil(totalMovies / limit);

    const links = await Movie.find({},)
      .select("title image _id data.genre")
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    return NextResponse.json({ success: true, data: links, totalPages });
  } catch (error) {
    console.error("Error fetching movies:", error);
    return NextResponse.json({ success: false });
  }
};
