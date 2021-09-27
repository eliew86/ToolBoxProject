"use strict";
const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const { v4: uuidv4 } = require("uuid");

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

module.exports = { addTool };