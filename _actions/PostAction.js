"use server";

import {dbConnect} from "@/lib/mongodb";
import Movie from "@/model/movie";

export default async function PostAction() {
  try {
    await dbConnect();
    console.log("MongoDB connected");
    const page = 1;
    const limit = 20;
    const skip = (page - 1) * limit;
    const links = JSON.parse(
      JSON.stringify(
        await Movie.find(
          {},
          { title: 1, "details.provider": 1, "details.link": 1 }
        )
          .select("-_id -__v")
          .skip(skip)
          .limit(limit)
          .lean()
      )
    );
    return links;
    throw new Error("error");
  } catch (error) {
    return { error };
  }
}
