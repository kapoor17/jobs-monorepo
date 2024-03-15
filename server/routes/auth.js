const express = require('express');
const authRouter = express.Router();

const {handleLogin, handleRegister} = require('../controllers/auth')

authRouter.post('/login', handleLogin)
authRouter.post('/register', handleRegister)

module.exports = authRouter;