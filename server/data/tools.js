const {v4: uuidv4} = require("uuid");

const tools = [
    {   
        _id: uuidv4(),
        toolName: "screwdriver", 
        type: "manual",
        category: "handTool",
        pricePerDay: "5",
        city: "Montreal"
    },
    {
        _id: uuidv4(),
        toolName: "ladder",
        type: "manual",
        category: "tool",
        pricePerDay: "15",
        city: "Laval"
    },
    {
        _id: uuidv4(),
        toolName: "hammer",
        type: "manual",
        category: "handTool",
        pricePerDay: "6",
        city: "St-Jerome"
    }
]

module.exports = {tools};