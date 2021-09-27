const {v4: uuidv4} = require("uuid");

const tools = [
    {   
        _id: uuidv4(),
        name: "screwdriver", 
        type: "manual",
        category: "handtool"
    },
    {
        _id: uuidv4(),
        name: "ladder",
        type: "manual",
        category: "tool"
    },
    {
        _id: uuidv4(),
        name: "hammer",
        type: "manual",
        category: "handtool"
    }
]

module.exports = {tools};