"use strict";
const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const { v4: uuidv4 } = require("uuid");

// add a profile to the database
const addProfile = async (req, res) => {

    // create new client
    const client = new MongoClient(MONGO_URI, options);

    // connect the client
    await client.connect();

    // connect the database
    const db = client.db("toolbox");

    try{

        const{
            firstName,
            lastName,
            email,
            password
        } = req.body;

        const data = {
            firstName,
            lastName,
            email,
            password,
            _id:uuidv4()
        }

        // add profile data to the profiles collection
        await db.collection("profiles").insertOne(data);

        client.close();
        res.status(200).json({status: 200, message: "Profile creation successful", data: data});
    }catch(err){

        client.close();
        res.status(500).json({ status: 500, data: err, message: "Cannot create profile"});
    }
};

// get a profile by email(for signin)
const getProfileByEmail = async (req, res) => {

    // create the client
    const client = new MongoClient(MONGO_URI, options);

    // connect the client
    await client.connect();

    // connect to the database
    const db = client.db("toolbox");

    const { email } = req.params;

    db.collection("profiles").findOne({email}, (err, result) => {

        result  
            ? res.status(200).json({status: 200, email, data: result})
            : res.status(400).json({status: 400, email, data:"Profile not found", err});
        client.close();
    });
} 

module.exports = { addProfile, getProfileByEmail };