"use strict";
const morgan = require("morgan");
const bodyParser = require("body-parser");
const PORT = 4000;

const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);

    socket.on("join_room", (data) => {
        socket.join(data)
        console.log(`User with ID: ${socket.id} joined room: ${data}`)
    })

    socket.on("send_message", (data) => {
        socket.to(data.room).emit("receive_message", data)
    })

    socket.on("disconnect", () => {
        console.log("User Disconnected", socket.id)
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

server.listen(PORT, () => console.info(`Listening on port ${PORT}`));