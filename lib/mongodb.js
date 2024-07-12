import mongoose from "mongoose";

const MONGODB_URI = process.env.NEXT_PUBLIC_API_BASE_URL;

global.mongoose = {
  conn: null,
  promise: null,
};

export const dbConnect = async () => {
  if (global.mongoose && global.mongoose.conn) {
    console.log("MongoDB is already connected");
    return global.mongoose.conn;
  } else {
    const promise = mongoose.connect(MONGODB_URI, { autoIndex: true });

    global.mongoose = {
      conn: await promise,
      promise,
    };
    console.log("MongoDB connected");

    return await promise;
  }
};
