"use strict";

// const express = require("express");
const express = require('express')
const bodyParser = require("body-parser");
const morgan = require("morgan");
const PORT = 4000;

// socket.io
const app = require('express')()
const http = require('http').createServer(app);
const io = require("socket.io")(http)

io.on('connection', socket => {
    socket.on('message', ({name, message}) => {
        io.emit('message', {name, message})
    })
})


app.use(function(req, res, next) {
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
app.use(morgan("tiny"))
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: false }))
app.use("/", express.static(__dirname + "/"))

// REST endpoints
app.use(require('./routes/tools'))
app.use(require('./routes/profiles'))
app.use(require('./routes/payment'))


// catch all endpoint
app.get("*", (req, res) => {
    res.status(404).json({
        status: 404,
        message: "This is obviously not what you're looking for",
    })
})

http.listen(PORT, () => console.info(`Listening on port ${PORT}`));