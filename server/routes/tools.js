/**
    Endpoints related to purchases
 */

    const router = require('express').Router();

    const {
        addTool, getToolById
    } = require("../handlers/toolsHandlers");

    router.post("/addTools", addTool);
    router.get("/getTool/:_id", getToolById);

    module.exports = router;