/**
    Endpoints related to profiles
 */

const router = require('express').Router();

const {
    addProfile,
    getProfileByEmail
} = require("../handlers/profileHandlers");

router.post("/addProfile", addProfile);
router.post("/getProfile", getProfileByEmail);

module.exports = router;