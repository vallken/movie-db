// models/movie.ts
import mongoose, { Schema, Document, model, models } from 'mongoose';

const lk21Models = new mongoose.Schema({
    provider: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    }
})
const lk21Schema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    details: [lk21Models],
    image: {
        type: String,
        required: true
    },
    updatedAt: {
        type: Date,
        default: Date.now,
      },
});


const Movie = models.lk21 || model("lk21", lk21Schema);

export default Movie;

