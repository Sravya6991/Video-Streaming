const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
    id: Number,
    name: String,
    poster: String,
    rating: Number,
    summary: String,
    trailer: String
})

mongoose.model("movies", movieSchema)

module.exports = mongoose.model("movies", movieSchema)