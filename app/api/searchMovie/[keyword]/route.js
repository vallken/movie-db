import { NextResponse } from 'next/server';
import {dbConnect} from '@/lib/mongodb';
import Movie from '@/model/movie';

export async function GET(req, {params}) {
  await dbConnect();

  try {
    const { keyword } = params;


    if (!keyword) {
      return NextResponse.json({ success: false, message: 'Keyword is required' }, { status: 400 });
    }

    const titleRegex = new RegExp(keyword, "i");
    const movies = await Movie.find({ title: { $regex: titleRegex } })
      .select("-_id -__v")
      .lean();

    return NextResponse.json({ success: true, data: movies });
  } catch (error) {
    console.error('Error fetching movies:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
