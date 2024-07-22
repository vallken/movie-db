import mongoose, { Schema } from 'mongoose';

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
    id: {type: Number, required: true}
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.animelinks || mongoose.model('animelinks', downloadLinkSchema)
