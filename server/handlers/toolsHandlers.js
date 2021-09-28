"use strict";
const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const { v4: uuidv4 } = require("uuid");

// add a tool for rent
const addTool = async (req, res) => {

    // create new client
    const client = new MongoClient(MONGO_URI, options);

    // connect to the client
    await client.connect();

    // connect the database
    const db = client.db("toolbox");

    try{

        const {
            toolName,
            type,
            category,
            pricePerDay,
            city
        } = req.body;

        const data = {
            toolName,
            type,
            category,
            pricePerDay,
            city,
            _id:uuidv4()
        }

        // add tool data to the tools collection
        await db.collection("tools").insertOne(data);

        res.status(200).json({status: 200, message: "Tool added successfully", data: data});
    } catch(err){
        console.log("error", err);
        res.status(500).json({status: 500, data: err, message: "Cannot add tool"});
    }

};

// get one of the tools for rent
const getToolById = async (req, res) => {

    // create the client
    const client = new MongoClient(MONGO_URI, options);

    // connect the client
    await client.connect();

    // connect to the database 
    const db = client.db("toolbox");

    const { _id } = req.params;

    db.collection("tools").findOne({_id}, (err, result) => {

        result  
            ? res.status(200).json({status: 200, _id, data: result})
            : res.status(400).json({status: 400, _id, data:"Tool not found", err});
        client.close();
    });
}

module.exports = { addTool, getToolById };