const { request, response } = require('express')
const express = require('express')
const postModel = require('../models/posts');
const Router = express.Router()

Router.get("/", async (request, response, next) => {
    // console.log("list posts");
    // var select = request.query.select;
    try{
        const posts = await postModel.find().populate("author")
        response.json(posts)
    } catch (e){

    }
})

Router.get("/:id", async (request, response) => {
    try{
        const id = request.params.id
        const posts = await postModel.find(id).populate("author")
        response.json(posts)
    } catch (e){

    }
})

Router.post("/", async (request, response) => {
    try{
        const postData = request.body
        const postInstance = new postModel({
            title: postData.title,
            body: postData.body,
            author: postData.author
        })
        const post = await postInstance.save()
        console.log(post);
        response.send("post created")
    } catch (e){
        console.log(e);
    }
})

Router.patch("/:id", async (request, response) => {
    try{
        const id = request.params.id
        console.log(`update spicefic post with id = ${id}`);
        const postData = request.body
        const post = await postModel.findByIdAndUpdate(id, postData)
        console.log(post);
        response.send("post updated")
    } catch (e){
        console.log(e);
    }
})

Router.delete("/:id", async (request, response) => {
    try{
        const id = request.params.id
        const post = await postModel.findByIdAndDelete(id)
        console.log(post);
        response.send("post deleted")
    } catch (e){
        console.log(e);
    }
})

module.exports = Router


