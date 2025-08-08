const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async(req, res, next) => {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1]; //at [0] is Bearer in Authorization Header
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                res.status(401);
                throw new Error("User is not Authorized");
            }
            //console.log(decoded);
            req.user = decoded.user; //token is verified now and the data is fetched
            next(); //middleware
        });
    }

    if(!token){
        res.status(401);
        throw new Error("User is not Authorized or token is missing");
    }
});

module.exports = validateToken;