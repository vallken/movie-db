
import mongoose, { Schema } from 'mongoose';

// Provider Schema
const ProvSchema = new mongoose.Schema(
  {
    provider: {
      type: String,
      required: true,
      trim: true,
    },
    link: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: function (v) {
          return /^(ftp|http|https):\/\/[^ "]+$/.test(v);
        },
        message: (props) => `${props.value} is not a valid URL!`,
      },
    },
  },
  {
    _id: false,
  }
);

// Episode Schema
const EpsSchema = new mongoose.Schema(
  {
    episode: {
      type: String,
      required: true,
      trim: true,
    },
    links: [ProvSchema],
  },
  {
    _id: false,
  }
);

// Season Schema
const SeasonSchema = new mongoose.Schema(
  {
    season: {
      type: String,
      required: true,
    },
    episodes: [EpsSchema],
  },
  {
    _id: false,
  }
);

// Drama Schema
const DramaSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    image: { type: String, required: true },
    synopsis: { type: String, required: true },
    seasons: [SeasonSchema],
    data: {
      status: {type: String, required: true},
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
    id: {type: Number, required: true},
    cloudinaryId: {type: String, required: true},
  },
  {
    timestamps: true,
  }
);

// Create the model
export default mongoose.models.Dramalinks || mongoose.model('Dramalinks', DramaSchema)
