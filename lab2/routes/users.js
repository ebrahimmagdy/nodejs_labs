const { request, response } = require('express')
const express = require('express');
const userModel = require('../models/users');
// const ObjectId = require('mongodb').ObjectID;
const Router = express.Router()

Router.get("/", (request, response) => {
    console.log("list users");
    var select = request.query.select;

    userModel.find({}, function(err, foudData){
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
    console.log(`list spicefic user with id = ${id}`);
    var select = request.query.select;

    userModel.findById(id, function(err, foudData){
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
        if (err)
            return response.json(userDoc)    
    })
    response.send("user created");
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


