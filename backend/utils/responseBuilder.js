module.exports = (response, errorCode, body) => response.status(errorCode).json(body);
