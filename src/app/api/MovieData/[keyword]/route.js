import { NextResponse } from "next/server";
import { dbConnectMovie} from "@/src/lib/mongodb";
import getMovieModel from "@/model/movie";

export async function GET(req, { params }) {
  await dbConnectMovie();

  try {
    const { keyword } = params;

    if (!keyword) {
      return NextResponse.json(
        { success: false, message: "Keyword is required" },
        { status: 400 }
      );
    }
    const Movie = await getMovieModel()
    const movie = await Movie.findOne({ title: keyword })
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
