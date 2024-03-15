const { StatusCodes } = require('http-status-codes')

const errorHandlerMiddleware = (error, req, res, next) => {
  return res.status(error.status || StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message })
}

module.exports = errorHandlerMiddleware
