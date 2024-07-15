import { dbConnectAnime } from "@/src/lib/mongodb";
import getAnimeModel from "@/model/anime";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    await dbConnectAnime();
    const AnimeModel = await getAnimeModel()

    // Extract the page query parameter
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);

    const limit = 20;
    const skip = (page - 1) * limit;

    const totalMovies = await AnimeModel.countDocuments({ title: { $exists: true } });
    const totalPages = Math.ceil(totalMovies / limit);

    const links = await AnimeModel.find(
      {},
      { title: 1, images: 1 }
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
