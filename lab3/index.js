const express = require('express')
const app = express()
const usersRouter = require("./routes/users")
const postsRouter = require("./routes/posts")
const ratingRouter = require("./routes/rating")
const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/blogApp", {
     //useNewUrlParser = true,
     //useUnifiedTopology = true,
}, (err) => {
    if (err)
        return console.log("can not connect to db");
    console.log("connected to db");
})

app.use(express.json())
app.use("/users", usersRouter)
app.use("/posts", postsRouter)
app.use("/rating", ratingRouter)

app.listen(3030, (err) => {
    if(err)
        return console.log(err);
})

module.exports = mongoose