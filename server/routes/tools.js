/**
    Endpoints related to tools
 */

const router = require('express').Router();

const {
    addTool, 
    getToolById,
    getTools,
    getManyTools
} = require("../handlers/toolsHandlers");

router.post("/addTools", addTool);
router.get("/getTools/:_id", getToolById);
router.get("/getTools", getTools);
router.get("/getManyTools", getManyTools);

module.exports = router;