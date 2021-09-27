const {v4: uuidv4} = require("uuid");

const tools = [
    {   
        _id: uuidv4(),
        name: "screwdriver", 
        type: "manual",
        heavy: "false",
        category: "handtool",
    }
]

module.exports = {tools};