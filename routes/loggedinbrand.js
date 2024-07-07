const express = require('express');
const localBrand = require("../localBrand");
const products = require("../products");

let router = express.Router();
const authenticateLocalBrand = require('../middleware/authenticateLocalBrand');

//variation 1
router.get('/', authenticateLocalBrand, async function(req,res){
    const localbrandId = req.localbrand.brandId;
    const brandname = await localBrand.findOne({_id: localbrandId}, "name");
    const results = await products.find({brand: brandname.name});
    console.log('localbrandId: ', localbrandId);
    console.log("brandname", brandname);
    console.log("results", results);

    res.send(results);

})

//variation 2
router.get("/:brandname",authenticateLocalBrand, async function(req,res){
    const brandname = req.params.brandname;
    let brandId = await localBrand.findOne({name: brandname} , "_id");
    brandId = await brandId._id.toString();
    const localbrand = req.localbrand;
    console.log('brand id: ', brandId);
    console.log("the localbrand id in the token: ", localbrand.brandId);


    
    if (localbrand.brandId !== brandId) {
        return res.status(403).json({
            message: 'Access denied',
            error: 'You do not have access to these resources'
        });
    }

    
    try {
        const yourproducts = await products.find({brand: brandname})
        res.json({ message: 'Access granted', yourproducts });
    } catch (err) {
        console.error('Error fetching products:', err);
        res.status(500).json({ message: 'Internal server error', error: err.message });
    }

} )
module.exports = router;