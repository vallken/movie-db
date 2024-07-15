import { NextResponse } from "next/server";
import { dbConnectAnime } from "@/src/lib/mongodb";
import getAnimeModel from "@/model/anime";
export async function GET(req, { params }) {
  await dbConnectAnime();
  const AnimeModel = await getAnimeModel()

  try {
    const { keyword } = params;
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);

    const limit = 20;
    const skip = (page - 1) * limit;

    if (!keyword) {
      return NextResponse.json(
        { success: false, message: "Keyword is required" },
        { status: 400 }
      );
    }
    const titleRegex = new RegExp(keyword, "i");
    const totalMovies = await AnimeModel.countDocuments({
      title: { $regex: titleRegex },
    });
    const movies = await AnimeModel.find({ title: { $regex: titleRegex } })
      .select("-_id -__v")
      .skip(skip)
      .limit(limit)
      .lean();

    const totalPages = Math.ceil(totalMovies / limit);
    return NextResponse.json({ success: true, data: movies, totalPages });
  } catch (error) {
    console.error("Error fetching movies:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
