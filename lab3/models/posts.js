const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
    title: String,
    body: String,
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
})

const postModel = mongoose.model("Post", postSchema)

module.exports = postModel