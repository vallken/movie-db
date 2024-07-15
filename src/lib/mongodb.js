import mongoose from "mongoose";

const MOVIE_DB_URI = process.env.NEXT_PUBLIC_MOVIE_DB;
const ANIME_DB_URI = process.env.NEXT_PUBLIC_ANIME_DB;

global.mongoose = {
  movieConn: null,
  animeConn: null,
  moviePromise: null,
  animePromise: null,
};

export const dbConnectMovie = async () => {
  if (global.mongoose && global.mongoose.movieConn) {
    console.log("Movie MongoDB is already connected");
    return global.mongoose.movieConn;
  } else {
    const promise = mongoose.createConnection(MOVIE_DB_URI, { autoIndex: true });

    global.mongoose = {
      ...global.mongoose,
      movieConn: await promise,
      moviePromise: promise,
    };
    console.log("Movie MongoDB connected");

    return await promise;
  }
};

export const dbConnectAnime = async () => {
  if (global.mongoose && global.mongoose.animeConn) {
    console.log("Anime MongoDB is already connected");
    return global.mongoose.animeConn;
  } else {
    const promise = mongoose.createConnection(ANIME_DB_URI, { autoIndex: true });

    global.mongoose = {
      ...global.mongoose,
      animeConn: await promise,
      animePromise: promise,
    };
    console.log("Anime MongoDB connected");

    return await promise;
  }
};  