let validateCardNumber = (cardNumber) => {

    // Checks if the number is 4 series of 4 numbers each.
    // Each series can be seperated by a dash, a space or no space.

    const re = /^[0-9]{4}\s?-?[0-9]{4}\s?-?[0-9]{4}\s?-?[0-9]{4}$/;

    return re.test(cardNumber);
}

// validate the credit card information
const validatePayment = (req, res) => {

    try{

        const {
            cardNumber,
            expirationDate,
            ccv
        } = req.body

        const data = {
            cardNumber,
            expirationDate,
            ccv
        }

        if(!validateCardNumber(cardNumber)){
            return res.status(400).json({status: 400, message: "Invalid credit card number"})
        } 

        res.status(200).json({status: 200, message: "Transaction complete", data: data});

    }catch(err){
        console.log("error", err);
        res.status(500).json({ status: 500, data: err, message: "Cannot complete transaction"});
    }
}

module.exports = { validatePayment };