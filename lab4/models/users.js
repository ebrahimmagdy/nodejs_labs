const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
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

userSchema.method.getAge = function () {
    var ageDifMs = Date.now() - this.DOB.getTime();
    var ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}

userSchema.static.countUsersByGender = function (g, cp) {
    this.count({gender: g}, cp)
}

userSchema.pre("save", function (next) {
    if(this.isNew){
        bcrypt.hash(this.password, 10, (err, hashedPassword) => {
            this.password = hashedPassword
            next()
        })
    }else{
        next()
    }
})

const userModel = mongoose.model("User", userSchema)

module.exports = userModel