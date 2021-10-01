/**
    Endpoints related to payment
 */

    const router = require('express').Router();

    const {
        validatePayment
    } = require("../handlers/paymentHandlers");
    
    router.post("/paymentValidate", validatePayment);
    
    module.exports = router;