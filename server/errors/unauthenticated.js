const { StatusCodes } = require('http-status-codes');

class UnauthenticatedError extends Error {
  constructor(message) {
    super(message);
    this.status = StatusCodes.UNAUTHORIZED;
  }
}

module.exports = UnauthenticatedError;
