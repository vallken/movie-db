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
  title: {
    type: String,
    required: true,
  },
  details: [lk21Models],
  image: {
    type: String,
    required: true,
  },
  synopsis: { type: String, required: true },
  data: {
    kualitas: {type: String, required: true},
    negara: {type: String, required: true},
    bintangFilm: [{type: String, required: true}],
    sutradara: {type: String, required: true},
    genre: {type: String, required: true},
    imdb: {
      rating: {type: Number, required: true},
      scale: {type: Number, required: true},
      users: {type: Number, required: true}
    },
    diterbitkan: {type: String, required: true},
    durasi: {type: String, required: true}
  },
  cloudinaryId: {type: String, required: true},
});

export default mongoose.models.lk21 || mongoose.model('lk21', lk21Schema)
