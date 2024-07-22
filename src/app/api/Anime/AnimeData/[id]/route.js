import { NextResponse } from "next/server";
import { dbConnect } from "@/src/lib/mongodb";
import AnimeModel from "@/model/anime";

export async function GET(req, { params }) {
  await dbConnect();

  try {
    console.log({params});
    const id = parseInt(params.id);

    if (!id) {
      return NextResponse.json(
        { success: false, message: "id is required" },
        { status: 400 }
      );
    }

    const movie = await AnimeModel.findOne({ id: id })
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
