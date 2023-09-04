const jwt = require("jsonwebtoken");

module.exports = async function isAuthenticated(req, res, next) {
    const bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== 'undefined') {
        const bearerToken = bearerHeader.split(" ")[1];
        req.token = bearerToken;
        console.log(bearerToken);
        next();
    } else {
        res.sendStatus(403);
    }
};