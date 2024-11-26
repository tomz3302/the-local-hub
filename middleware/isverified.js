const localBrand = require("../localBrand");



const isverified = async (req, res, next) => {
    console.log("this middleware is run");

    const localbrandId = req.localbrand.brandId;
    const brandverification = await localBrand.findOne({_id: localbrandId}, "authenticated");
    console.log(brandverification);

    if(brandverification.authenticated == "pending"){
        res.send(" Your request is still pending");
    }
    else if(brandverification.authenticated == "rejected"){
        res.send("you are rejected tezak 7amra");
    }
    else if(brandverification.authenticated == "accepted"){
        next();
    }



}

module.exports = isverified;