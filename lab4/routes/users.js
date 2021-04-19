const { request, response } = require('express')
const express = require('express');
const userModel = require('../models/users');
// const ObjectId = require('mongodb').ObjectID;
const Router = express.Router()

Router.get("/", async (request, response) => {
    try{
        const users = await userModel.find().populate("posts")
        response.json(users)
    } catch (e){

    }
})

Router.get("/:id", async (request, response) => {
    try{
        const id = request.params.id
        const users = await userModel.find(id).populate("posts")
        response.json(users)
    } catch (e){

    }
})

Router.post("/", (request, response, next) => {
    try{
        const userData = request.body
        const userInstance = new userModel({
            firstName: userData.firstName,
            lastName: userData.lastName,
            gender: userData.gender,
            DOB: userData.DOB,
            email: userData.email,
            password: userData.password
        })
        const user = await userInstance.save()
        console.log(user);
        response.send("user created")
    } catch (e){
        console.log(e);
    }
})

Router.patch("/:id", async (request, response) => {
    try{
        const id = request.params.id
        console.log(`update spicefic user with id = ${id}`);
        const userData = request.body
        const user = await userModel.findByIdAndUpdate(id, userData)
        console.log(user);
        response.send("user updated")
    } catch (e){
        console.log(e);
    }
})

Router.delete("/:id", (request, response) => {
    try{
        const id = request.params.id
        const user = await userModel.findByIdAndDelete(id)
        console.log(post);
        response.send("user deleted")
    } catch (e){
        console.log(e);
    }
})

module.exports = Router