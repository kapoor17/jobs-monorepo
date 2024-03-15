const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");
const User = require("../models/User");

const handleLogin = async (req, res) => {
    const {email, password} = req.body;
    if(!email || !password) throw new BadRequestError("Please provide email and password");

    const user = await User.findOne({email});
    if(!user) throw new UnauthenticatedError("Invalid Credentials");

    const isMatch = await user.comparePassword(password);
    if(!isMatch) throw new UnauthenticatedError("Wrong Password");

    const token = await user.createJWT();

    res.status(StatusCodes.OK).json({
        user: {
            name: user.name
        },
        token
    });
}

const handleRegister = async (req, res) => {
    const {name, email, password} = req.body;
    if(!name || !email || !password){
        throw new BadRequestError("Please provide name, email and password");
    }
    
    const user = await User.create(req.body);
    const token = user.createJWT();

    res.status(StatusCodes.CREATED).json({
        user: {
            name: user.name
        },
        token
    })
}

module.exports = {
    handleLogin,
    handleRegister
}