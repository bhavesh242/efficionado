module.exports = responseBuilder = (response, errorCode, body) => response.status(errorCode).json(body);