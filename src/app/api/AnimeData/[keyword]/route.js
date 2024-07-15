import { NextResponse } from "next/server";
import { dbConnectAnime } from "@/src/lib/mongodb";
import getAnimeModel from "@/model/anime";

export async function GET(req, { params }) {
  await dbConnectAnime();
  const AnimeModel = await getAnimeModel()

  try {
    const { keyword } = params;

    if (!keyword) {
      return NextResponse.json(
        { success: false, message: "Keyword is required" },
        { status: 400 }
      );
    }

    const movie = await AnimeModel.findOne({ title: keyword.replace() })
      .select("-_id -__v")
      .lean();

    if (!movie) {
      return NextResponse.json(
        { success: false, message: "Movie not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: movie });
  } catch (error) {
    console.error("Error fetching movie:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
