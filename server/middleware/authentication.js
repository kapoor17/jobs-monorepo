const BadRequestError = require("../errors/bad-request");
const jwt = require('jsonwebtoken')

const authenticate = (req, res, next) => {
    const authorization = req.headers.authorization;
    if(!authorization || !authorization.startsWith('Bearer')){
        throw new BadRequestError("Authentication invalid");
    }

    const token = authorization.split(' ')[1]

    try{
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        // can also find a user in the db with the payload.id and attach that user to the req object
        req.user = {
            userID: payload.userID,
            name: payload.name
        }
        next();
    }catch{
        throw new BadRequestError('Authentication Invalid')
    }
}

module.exports = authenticate;