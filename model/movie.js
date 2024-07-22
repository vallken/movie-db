import mongoose from "mongoose";

const lk21Models = new mongoose.Schema({
  provider: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
});
const lk21Schema = new mongoose.Schema({
  id: { type: Number, required: true },
  title: {
    type: String,
    required: true,
  },
  details: [lk21Models],
  image: {
    type: String,
    required: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.lk21 || mongoose.model('lk21', lk21Schema)
