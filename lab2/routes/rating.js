const { request, response } = require('express')
const express = require('express')
const ratingModel = require('../models/rating');
const Router = express.Router()

Router.get("/", (request, response) => {
    console.log("list rating");
    var select = request.query.select;

    ratingModel.find({}, function(err, foudData){
        if(err){
            console.log(err);
            response.status(500).send();
        } else {
            if(foudData.length == 0){
                var responseOpject = undefined;
                if(select && select == 'count'){
                    responseOpject = {count: 0};
                }
                console.log(responseOpject);
                response.status(404).send(responseOpject);
            } else {
                var responseOpject = foudData;
                if(select && select == 'count'){
                    responseOpject = {count: foudData.length};
                }
                console.log(responseOpject);
                response.send(responseOpject);
            }
        }
    })
})

Router.get("/:id", (request, response) => {
    const id = request.params.id
    console.log(`list spicefic post with id = ${id}`);
    var select = request.query.select;

    ratingModel.findById(id, function(err, foudData){
        if(err){
            console.log(err);
            response.status(500).send();
        } else {
            if(foudData.length == 0){
                var responseOpject = undefined;
                if(select && select == 'count'){
                    responseOpject = {count: 0};
                }
                response.status(404).send(responseOpject);
            } else {
                var responseOpject = foudData;
                if(select && select == 'count'){
                    responseOpject = {count: foudData.length};
                }
                response.send(responseOpject);
            }
        }
    })
})

Router.post("/", (request, response) => {
    console.log("post");
    const ratingData = request.body
    const ratingInstance = new ratingModel({
        rating: ratingData.rating,
        onId: ratingData.onId,
        author: ratingData.author
    })
    console.log(ratingInstance);
    ratingInstance.markModified();
    ratingInstance.save((err, ratingDoc) => {
        if (err)
            return response.json(ratingDoc)
    })
    response.send("rating submitted");
})

Router.patch("/:id", (request, response) => {
    const id = request.params.id
    console.log(`update spicefic post with id = ${id}`);
    const ratingData = request.body
    postModel.findByIdAndUpdate(id, ratingData, function(err, foudData){
        if(err){
            console.log(err);
            response.status(500).send();
        } else {
            response.send("rating updated");
        }
    })
})

Router.delete("/:id", (request, response) => {
    const id = request.params.id
    console.log(`update spicefic post with id = ${id}`);
    postModel.findByIdAndDelete(id, function(err, foudData){
        if(err){
            console.log(err);
            response.status(500).send();
        } else {
            response.send("rating deleted");
        }
    })
})

module.exports = Router


