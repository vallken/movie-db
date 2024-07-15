import mongoose, { Schema, model, models } from 'mongoose';
import { dbConnectAnime } from "@/src/lib/mongodb";

const linkSchema = new Schema({
  provider: { type: String, required: true },
  link: { type: String, required: true },
}, { _id: false });

const resSchema = new Schema({
  resolution: { type: String, required: true },
  details: [linkSchema],
}, { _id: false });

const downloadLinkSchema = new Schema(
  {
    title: { type: String, required: true },
    link: [resSchema],
    images: {
      jpg: { type: String, required: true },
      webp: { type: String, required: true },
    },
    synopsis: { type: String, required: true },
    episodes: { type: Number, required: true },
    status: { type: String, required: true },
    duration: { type: String, required: true },
    rating: { type: String, required: true },
    score: { type: Number, required: true },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

const getAnimeModel = async() => {
  const conn = await dbConnectAnime()
  if(conn.models.downloadlinks){
    return conn.models.downloadlinks;
  } 
  return conn.model('downloadlinks', downloadLinkSchema)
}

export default getAnimeModel
