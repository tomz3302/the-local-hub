const jwt = require('jsonwebtoken');

exports.cookieJwtAuth =(req,res,next) =>{
    const token =req.headers.authorization.split(' ')[1];
    try{
        const localbrand = jwt.verify(token, jwt_secret);
        req.localbrand = localbrand;
        next();
    }catch(err){
        res.send('you dont have access');

    }
}