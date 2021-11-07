//The following code takes care of all user related requests
const router = require('express').Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require('../middleware/auth');

const User = require("../models/user.model");







module.exports = router;