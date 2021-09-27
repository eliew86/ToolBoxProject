/**
    Endpoints related to purchases
 */

    const router = require('express').Router();

    const {
        addTool,
    } = require("../handlers/toolsHandlers");

    router.post("/addTools", addTool);

    module.exports = router;