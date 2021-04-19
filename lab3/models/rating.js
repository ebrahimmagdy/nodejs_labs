const mongoose = require("mongoose")

const ratingSchema = new mongoose.Schema({
    rating: { type: Number, required: true, min: 0, max: 5 },
    onId: { type: mongoose.Schema.Types.ObjectId, refPath: 'onModel', required: true},
    onModel: { type: String, required: true, enum: ["User", "Post"]},
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
})

const ratingModel = mongoose.model("Rating", ratingSchema)

module.exports = ratingModel