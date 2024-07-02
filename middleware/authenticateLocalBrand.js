const jwt = require('jsonwebtoken');
const jwt_secret = 'tomzorrow@auc.kosak'; // Replace with your actual secret

const authenticateLocalBrand = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Access denied', error: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const payload = jwt.verify(token, jwt_secret);
        req.localbrand = payload; // Assuming payload contains the local brand's information
        next();
    } catch (err) {
        console.error('Token verification error:', err);
        return res.status(403).json({ message: 'Access denied', error: 'Invalid or expired token' });
    }
};

module.exports = authenticateLocalBrand;
