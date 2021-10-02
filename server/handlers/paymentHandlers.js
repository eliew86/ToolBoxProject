let validateCardNumber = (cardNumber) => {

    // Checks if the number is 4 series of 4 numbers each.
    // Each series can be seperated by a dash, a space or no space.

    const re = /^[0-9]{4}\s?-?[0-9]{4}\s?-?[0-9]{4}\s?-?[0-9]{4}$/;

    return re.test(cardNumber);
}

let validateExpirationDate = (expirationDate) => {

    // Checks if the date is a series of 2 numbers
    // followed by a dash, a frontslash, a space or no space
    // followed by another series of 2 numbers

    const re = /^(0[1-9]|1[0-2])\s?-?\/?([0-9]{4}|[0-9]{2})$/;

    return re.test(expirationDate);
}

let validateCCV = (ccvNumber) => {

    // Check if the CCV is strictly 3 numbers
    const re = /^[0-9]{3}$/

    return re.test(ccvNumber);
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

        if(!validateExpirationDate(expirationDate)){

            return res.status(400).json({status: 400, message: "Invalid expiration date"})
        }

        if(!validateCCV(ccv)){

            return res.status(400).json({status: 400, message: "Invalid CCV"})
        }

        res.status(200).json({status: 200, message: "Transaction complete", data: data});

    }catch(err){
        console.log("error", err);
        res.status(500).json({ status: 500, data: err, message: "Cannot complete transaction"});
    }
}

module.exports = { validatePayment };