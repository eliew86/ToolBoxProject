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
            city,
            imgUrl,
            isAvailable,
            ownerId,
            renterId
        } = req.body;

        const data = {
            toolName,
            type,
            category,
            pricePerDay,
            city,
            imgUrl,
            isAvailable,
            ownerId,
            renterId,
            _id:uuidv4()
        }

        // add tool data to the tools collection
        await db.collection("tools").insertOne(data);

        res.status(200).json({status: 200, message: "Tool added successfully", data: data});
    } catch(err){
        console.log("error", err);
        res.status(500).json({status: 500, data: err, message: "Cannot add tool"});
    }

    client.close();
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

// get tools using req.query start and limit
const getManyTools = async (req, res) => {

    
    try{

        // create the client
        const client = new MongoClient(MONGO_URI, options);
    
        // connect the client
        await client.connect();
        
        // connect the database
        const db = client.db("toolbox");
        
        const tools = await db.collection("tools").find().toArray();
        
        const start = Number(req.query.start) || 0;
        const limit = Number(req.query.limit) || 2;



        if (start > tools.length) {
            res.status(400).json({
                status: 400,
                message: "Error: start exeeds the array length",
                data: { start, limit },
            });
            } else {
            const slicedData = tools.slice(start, start + limit);
            const actualLimit =
                limit > tools.length - start ? tools.length - start : limit;

            client.close()
            res
                .status(200)
                .json({ status: 200, data: slicedData, start, limit: actualLimit });
            }
    } catch(err){

        client.close();
        res.status(500).json({
        status: 500,
        message: "Error: start/limit error",
        data: { start, limit },
        });
    }
}

// get all of the tools for rent
const getTools = async (rea, res) => {

    // create the client
    const client = new MongoClient(MONGO_URI, options);

    // connect the client
    await client.connect();

    // connect to the database
    const db = client.db("toolbox");

    // asign the tools array to a const
    const tools = await db.collection("tools").find().toArray();

    // if tools array isn't epmty then return it, else return error
    if(tools.length){

        client.close();
        return res.status(200).json({status: 200, data: tools});
    } else {

        close.client()
        return res.status(404).json({status: 404, error: "Tools not found"})
    }
}

// update tools status isAvailable
const updateToolStatus = async (req, res) => {

    // create client
    const client = new MongoClient(MONGO_URI, options);

    const { _id } = req.params;

    try{

        // connect client
        await client.connect();

        // connect to database
        const db = client.db("toolbox");

        const query = { _id}

        // find the tool info
        const oldInfo = await db.collection("tools").findOne(query)

        const newValues = { $set: {...oldInfo, isAvailable: !oldInfo.isAvailable }}


        await db.collection("tools").updateOne(query, newValues)

        res.status(200).json({status: 200, message: "Tool status updated", ...newValues.$set})

    } catch(err) {
        res.status(500).json({status: 500, message: err.message})
    }
    client.close();
}

// update tool renterId
const updateToolRenterId = async (req, res) => {

    // create client
    const client = new MongoClient(MONGO_URI, options);

    const { _id } = req.params;

    try{

        // connect client
        await client.connect();

        // connect to database
        const db = client.db("toolbox");

        const query = { _id}

        // find the tool info
        const oldInfo = await db.collection("tools").findOne(query)

        const newValues = { $set: {...oldInfo, renterId: req.body.renterId }}


        await db.collection("tools").updateOne(query, newValues)

        res.status(200).json({status: 200, message: "Renter id updated", ...newValues.$set})

    } catch(err) {
        res.status(500).json({status: 500, message: err.message})
    }
    client.close();
}

module.exports = { addTool, getToolById, getTools, getManyTools, updateToolStatus,updateToolRenterId };