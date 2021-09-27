const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

const {tools} = require("./data/tools");
const{profiles} = require("./data/profiles")

const batchImport = async () => {

    try{
        // create new client
        const client = new MongoClient(MONGO_URI, options);

        // connect to the client
        await client.connect();

        // connect to the database
        const db = client.db("toolbox");

        // create the tools collection
        await db.collection("tools").insertMany(tools);

        // create the profiles collection
        await db.collection("profiles").insertMany(profiles);

        // disconnect the client
        client.close();
    } catch(err){
        console.log("batchImport error", err);
    }
};

batchImport();