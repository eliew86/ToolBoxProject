"use strict";
const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

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
            _id:email
        }

        db.collection("profiles").findOne({_id: email}, (err, result) => {
            
            if(result){
                res.status(400).json({status: 400, message: "Email already taken"})
            } 
        });

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

    // takes the email and pw put in by the user
    const { password, email } = req.body;

    // checks the profiles collection for a matching email
    db.collection("profiles").findOne({_id: email}, (err, result) => {

        if(result){
            // if profile found and the pw match return a 200
            if(result.password === password){

                res.status(200).json({status: 200, email, data: result});
            } else {
                
                res.status(400).json({status: 400, email, message:"username/password mismatch", data: err});
            }
        } else {

            res.status(400).json({status: 400, email, message:"Profile not found", data: err});
        }
        client.close();
    });
} 

module.exports = { addProfile, getProfileByEmail };