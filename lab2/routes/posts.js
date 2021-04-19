const { request, response } = require('express')
const express = require('express')
const postModel = require('../models/posts');
const Router = express.Router()

Router.get("/", (request, response) => {
    console.log("list posts");
    var select = request.query.select;

    postModel.find({}, function(err, foudData){
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

Router.get("/:id", (request, response) => {
    const id = request.params.id
    console.log(`list spicefic post with id = ${id}`);
    var select = request.query.select;

    postModel.findById(id, function(err, foudData){
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
    const postData = request.body
    const postInstance = new postModel({
        title: postData.title,
        body: postData.body,
        author: postData.author
    })

    postInstance.save((err, userDoc) => {
        if (err)
            return response.json(userDoc)    
    })
    response.send("post created");
})

Router.patch("/:id", (request, response) => {
    const id = request.params.id
    console.log(`update spicefic post with id = ${id}`);
    const userData = request.body
    postModel.findByIdAndUpdate(id, userData, function(err, foudData){
        if(err){
            console.log(err);
            response.status(500).send();
        } else {
            response.send("post updated");
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
            response.send("post deleted");
        }
    })
})

module.exports = Router


