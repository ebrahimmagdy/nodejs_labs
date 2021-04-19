const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    gender: { type: String },
    DOB: { type: Date },
    email: { type: String,  match: /.*@.*\..*/, unique: true},
    password: { type: String, required: true }
},
{ toJSON: { virtuals: true } }
);

userSchema.virtual("posts", {
    ref: "Post",
    foreignField: "author",
    localField: "_id"
});

const userModel = mongoose.model("User", userSchema)

module.exports = userModel