/**
    Endpoints related to tools
 */

const router = require('express').Router();

const {
    addTool,
    deleteTool,
    getToolById,
    getTools,
    getToolsByOwnerId,
    getToolsByRenterId,
    getManyTools,
    updateToolStatus,
    updateToolRenterId
} = require("../handlers/toolsHandlers");

router.post("/addTools", addTool);
router.delete("/deleteTool/:_id", deleteTool)
router.get("/getTools/:_id", getToolById);
router.get("/getTools", getTools);
router.get("/getOwnerTools/:ownerId", getToolsByOwnerId);
router.get("/getRentedTools/:renterId", getToolsByRenterId)
router.get("/getManyTools", getManyTools);
router.patch("/toolStatus/:_id", updateToolStatus)
router.patch("/renterIdUpdate/:_id", updateToolRenterId)

module.exports = router;