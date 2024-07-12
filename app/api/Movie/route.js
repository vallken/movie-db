import { dbConnect } from "@/lib/mongodb";
import Movie from "@/model/movie";
import { NextResponse } from "next/server";

// export default async function handler(req, res) {
//   try {
//     await dbConnect();

//     const page = parseInt(req.query.page) || 1;
//     const limit = parseInt(req.query.limit) || 10;
//     const skip = (page - 1) * limit;

//     const movies = await Movie.find({}, { title: 1, "details.provider": 1, "details.link": 1 })
//       .select("-_id -__v")
//       .skip(skip)
//       .limit(limit)
//       .lean();

//     res.status(200).json({ success: true, data: movies });
//   } catch (error) {
//     console.error('Error fetching movies:', error);
//     res.status(400).json({ success: false });
//   }
// }

export const GET = async () => {
  try {
    await dbConnect();
    const page = 5;
    const limit = 20;
    const skip = (page - 1) * limit;
    const links = await Movie.find(
      {},
      { title: 1, "details.provider": 1, "details.link": 1, image: 1 }
    )
      .select("-_id -__v")
      .skip(skip)
      .limit(limit)
      .lean();
    return NextResponse.json({ success: true, data: links });
  } catch (error) {
    console.error("Error fetching movies:", error);
    return NextResponse.json({ success: false });
  }
};
