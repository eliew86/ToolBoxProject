/**
    Endpoints related to tools
 */

const router = require('express').Router();

const {
    addTool, 
    getToolById,
    getTools,
    getManyTools,
    updateToolStatus,
    updateToolRenterId
} = require("../handlers/toolsHandlers");

router.post("/addTools", addTool);
router.get("/getTools/:_id", getToolById);
router.get("/getTools", getTools);
router.get("/getManyTools", getManyTools);
router.put("/toolStatus/:_id", updateToolStatus)
router.put("/renterIdUpdate/:_id", updateToolRenterId)

module.exports = router;