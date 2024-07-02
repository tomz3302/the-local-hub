const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const bodyParser = require('body-parser');
const products = require("./products");
const mongoose = require('mongoose');
const localBrand = require("./localBrand");
//const cookieJwtAuth = require('./cookieJwtAuth');
//const cookieParser = require("cookie-parser");
const loggedinbrandsroute = require('./routes/loggedinbrand')
const jwt_secret = 'tomzorrow@auc.kosak';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(cookieParser());

app.use("/edit", loggedinbrandsroute);

app.get('/home', async function(req,res){
    let categories = await products.distinct('category');
    res.send(categories);
})
app.get('/brands', async function(req,res){
    let allbrands = await localBrand.distinct('name');
    res.send(allbrands);
})
app.get('/brands/:brandname', async function(req,res){
    let results = await products.find({brand: req.params.brandname}, 'name category price')
    res.send(results);
});

app.get('/accessresources', async function(req, res) {
    let token;

    // Extract the token from the Authorization header
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.split(' ')[1];
    }

    // Check if the token is missing
    if (!token) {
        return res.status(401).json({
            message: 'Access denied',
            error: 'No token provided'
        });
    }

    try {
        // Verify the token
        const localbrand = jwt.verify(token, jwt_secret);

        // Attach the verified payload to the request object
        req.localbrand = localbrand;

        // Respond with a success message
        res.send('Access granted: sha8ala lolololoyy');
    } catch (err) {
        console.error('Token verification error:', err);

        // Send error response with details
        res.status(403).json({
            message: 'Access denied',
            error: 'Invalid or expired token'
        });
    }
});
app.get('/:category', async function(req, res) {

    // curl http://localhost:3001/category_name?sortOrder=asc (this is how to test)

    const sortOrder = req.query.sortOrder; 
    const sortCriteria = {};
    if (!sortOrder) {

        sortCriteria.created_at = 1; // Ascending order by creation date
    } else {
        // Sort by price based on the specified order
        if (sortOrder === 'asc') {
            sortCriteria.price = 1; // Ascending order by price
        } else if (sortOrder === 'desc') {
            sortCriteria.price = -1; // Descending order by price
        } else {
            // Invalid sortOrder value, handle appropriately (default to ascending by date)
            sortCriteria.created_at = 1;
        }
    }

    try {
        const results = await products.find({ category: req.params.category })
            .select('name price brand') // Select only the desired fields
            .sort(sortCriteria); // Apply sorting criteria
        res.json(results); // Send the sorted results
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/:category/:name', async function(req,res){
    let result = await products.find({name: req.params.name, category : req.params.category})
    res.send(result);
})


app.post('/registerbrand', async function(req,res){
    let newBrand;
    try{
        const { name, email, password, phoneNumber } = req.body;
        newBrand = new localBrand({
            name: name,
            email: email,
            password: password,
            phoneNumber: phoneNumber
        });

        await newBrand.save();
    }catch(error){
        res.status(500).send({ message: 'Error registering brand', error });

    }
    let token = token = jwt.sign(
        {
            email: newBrand.email,
            password: newBrand.password
        },
        jwt_secret,
        { expiresIn: "1h" }
    );
    res
            .status(201)
            .json({
                success: true,
                data: {
                    email: newBramd.email,
                    password: newBrand.password,
                    token: token
                },
            });
    

   
})

app.post('/brandlogin', async function(req, res) {
    const { email, password } = req.body;

    try {
        // Find the brand by email
        const currentbrand = await localBrand.findOne({ email: email });

        if (!currentbrand) {
            return res.status(401).json({
                message: 'Login failed',
                error: 'Invalid email or password'
            });
        }

        // Compare provided password with the stored password
        if (password !== currentbrand.password) { // Assuming password is stored in plain text, which is not recommended
            return res.status(401).json({
                message: 'Login failed',
                error: 'Invalid email or password'
            });
        }

        // Generate JWT token
        const payload = {
            brandId: currentbrand._id // Assuming you have a brandId or similar identifier
        };
        
        const token = jwt.sign(
            payload,
            jwt_secret,
            { expiresIn: "1h" }
        );

        // Respond with success message and token
        res.json({
            message: 'Login successful',
            data: {
                email: currentbrand.email,
                token: token
            }
        });

    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    }
});

app.listen(3001, () => {
    console.log("yo shit on channel 3001");
})
mongoose.connect("mongodb://localhost:27017/summer_project", {
    minpoolSize: 5,
    maxpoolSize: 15,
    serverSelectionTimeoutMS: 5000 // Set timeout for server selection
    }).then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Database connection error:', err));