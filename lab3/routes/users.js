const { request, response } = require('express')
const express = require('express');
const userModel = require('../models/users');
// const ObjectId = require('mongodb').ObjectID;
const Router = express.Router()

Router.get("/", (request, response) => {
    console.log("list users");
    var select = request.query.select;

    userModel.find().populate("posts").exec((err, post) => {
        response.json(post)
    })
})

Router.get("/:id", (request, response) => {
    const id = request.params.id
    console.log(`list spicefic user with id = ${id}`);
    var select = request.query.select;

    userModel.findById(id).populate("posts").exec((err, post) => {
        response.json(post)
    }) 
})

Router.post("/", (request, response, next) => {
    const userData = request.body
    const userInstance = new userModel({
        firstName: userData.firstName,
        lastName: userData.lastName,
        gender: userData.gender,
        DOB: userData.DOB,
        email: userData.email,
        password: userData.password
    })

    userInstance.save((err, userDoc) => {
        if (err){
            console.log(err);
            return response.json(err)
        }
        else{
            response.send("user created");
        }
    })
})

Router.patch("/:id", (request, response) => {
    const id = request.params.id
    console.log(`update spicefic user with id = ${id}`);
    const userData = request.body
    userModel.findByIdAndUpdate(id, userData, function(err, foudData){
        if(err){
            console.log(err);
            response.status(500).send();
        } else {
            response.send("user updated");
        }
    })
})

Router.delete("/:id", (request, response) => {
    const id = request.params.id
    console.log(`update spicefic user with id = ${id}`);
    userModel.findByIdAndDelete(id, function(err, foudData){
        if(err){
            console.log(err);
            response.status(500).send();
        } else {
            response.send("user deleted");
        }
    })
})

module.exports = Router


