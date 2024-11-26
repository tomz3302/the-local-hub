const express = require('express');
const localBrand = require("../localBrand");
const products = require("../products");

let router = express.Router();
const authenticateLocalBrand = require('../middleware/authenticateLocalBrand');
const isverified = require('../middleware/isverified');

//variation 1
router.get('/', authenticateLocalBrand, isverified, async function(req,res){
    const localbrandId = req.localbrand.brandId;
    const brandname = await localBrand.findOne({_id: localbrandId}, "name");
    const results = await products.find({brand: brandname.name});
    console.log('localbrandId: ', localbrandId);
    console.log("brandname", brandname);
    console.log("results", results);

    res.send(results);

})

//variation 2 is removed

module.exports = router;