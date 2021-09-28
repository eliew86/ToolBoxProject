"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const PORT = 4000;

express()
    .use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Methods",
            "OPTIONS, HEAD, GET, PUT, POST, DELETE"
        );
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, X-Requested-With, Content-Type, Accept"
        );
        next();
    })
    .use(morgan("tiny"))
    .use(bodyParser.json())
    .use(express.urlencoded({ extended: false }))
    .use("/", express.static(__dirname + "/"))

    // REST endpoints
    .use(require('./routes/tools'))
    .use(require('./routes/tools'))


    // catch all endpoint
    .get("*", (req, res) => {
        res.status(404).json({
            status: 404,
            message: "This is obviously not what you're looking for",
        })
    })

    .listen(PORT, () => console.info(`Listening on port ${PORT}`));