import { dbConnect } from "@/src/lib/mongodb";
import Drama from "@/model/drama";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    
    const limit = 20;
    const skip = (page - 1) * limit;
    
    const totalDrama = await Drama.countDocuments({ title: { $exists: true } });
    const totalPages = Math.ceil(totalDrama / limit);
    
    const links = await Drama.find(
      { title: { $exists: true } },
      { title: 1, image: 1, _id: 1 }
    )
      .skip(skip)
      .limit(limit)
      .lean();
    
    return NextResponse.json({ 
      success: true, 
      data: links, 
      totalPages,
      currentPage: page
    });
  } catch (error) {
    console.error("Error fetching dramas:", error);
    return NextResponse.json({ 
      success: false, 
      error: error.message || "An error occurred while fetching dramas" 
    }, { status: 500 });
  }
};