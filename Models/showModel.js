const mongoose = require("mongoose");

const showsSchema = new mongoose.Schema({
    id: String,
    duration: String,
    name: String,
    content_type: String
})

mongoose.model("shows", showsSchema)

module.exports = mongoose.model("shows", showsSchema)