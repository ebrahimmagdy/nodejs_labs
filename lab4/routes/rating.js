const { request, response } = require('express')
const express = require('express')
const ratingModel = require('../models/rating');
const Router = express.Router()

Router.get("/", async (request, response, next) => {
    // console.log("list posts");
    // var select = request.query.select;
    try{
        const ratings = await ratingModel.find().populate("author").populate("onId")
        response.json(ratings)
    } catch (e){

    }
})

Router.get("/:id", async (request, response) => {
    try{
        const id = request.params.id
        const ratings = await ratingModel.find(id).populate("author").populate("onId")
        response.json(ratings)
    } catch (e){

    }
})

Router.post("/", async (request, response) => {
    response.send("rating submitted");
    try{
        const ratingData = request.body
        const ratingInstance = new ratingModel({
            rating: ratingData.rating,
            onId: ratingData.onId,
            author: ratingData.author
        })
        const rating = await ratingInstance.save()
        console.log(rating);
        response.send("rating created")
    } catch (e){
        console.log(e);
    }
})

Router.patch("/:id", async (request, response) => {
    try{
        const id = request.params.id
        const ratingData = request.body
        const rating = await ratingModel.findByIdAndUpdate(id, ratingData)
        console.log(rating);
        response.send("rating updated")
    } catch (e){
        console.log(e);
    }
})

Router.delete("/:id", async (request, response) => {
    try{
        const id = request.params.id
        const rating = await ratingModel.findByIdAndDelete(id)
        console.log(rating);
        response.send("rating deleted")
    } catch (e){
        console.log(e);
    }
})

module.exports = Router


