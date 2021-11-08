//The following code takes care of all user related requests
const router = require('express').Router();
const bcrypt = require("bcrypt");
const { response } = require('express');
const jwt = require("jsonwebtoken");
const auth = require('../middleware/auth');
const User = require("../models/user.model");
const config = require('config');

//Include response building utility method
const responsBuilder = require('../utils/responseBuilder');

//
router.post("/register", async (req, res) => {
    try {

        let { userName, password, displayName } = req.body;

        //Validate that required values recieved are not null
        if (!userName || !password) {
            return responseBuilder(res, 400, { msg: "Username and password are both required" });
        }

        //Password length >= 5 characters
        if (password.length < 5) {
            return responseBuilder(res, 400, { msg: "Password needs to be atleast 5 characters long" });
        }

        //Check if the userName already taken
        const existingUser = await User.findOne({ userName: userName });

        if (existingUser) {
            return responseBuilder(res, 400, { msg: "This username is already taken!" });
        }

        //Encrypting password
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        //Store in form of user object based on the Schema model


        const newUser = new User(
            displayName ? {
                userName,
                password: passwordHash,
                displayName
            } :
                {
                    userName,
                    password: passwordHash
                });

        const saveUser = await newUser.save();
        return responseBuilder(res, 200, saveUser);
    }
    catch (err) {
        return responseBuilder(res, 500, { error: err.message });
    }
});

router.post("/login", async (req, res) => {
    try {
        const { userName, password } = req.body;

        // validate
        if (!userName || !password) {
            return responseBuilder(res, 400, { msg: "Username and password are both required" });
        }

        const user = await User.findOne({ userName: userName });
        if (!user) {
            return responseBuilder(res, 400, { msg: "No account with this username has been registered." });
        }

        //Check if the entered password hashes match
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return responsBuilder(res, 400, { msg: "Invalid credentials." });

        //Create a JWT based on application Secret
        const token = jwt.sign({ id: user._id }, config.get("Efficionado.jwtSecret"));
        console.log("token", token);
        return responseBuilder(res, 200,
            {
                token,
                user:
                {
                    id: user._id,
                    displayName: user.displayName,
                },
            });
    } catch (err) {
        return responseBuilder(res, 500, { error: err.message });
    }
});

router.delete("/delete", auth, async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.user);
        return responsBuilder(res, 200, deletedUser);
    } catch (err) {
        return responseBuilder(res, 500, { error: err.message });
    }
});

router.post("/tokenIsValid", async (req, res) => {
    try {
        const token = req.header("x-auth-token");
        if (!token)
            return responseBuilder(res, 200, false);

        const verified = jwt.verify(token, config.get("Efficionado.jwtSecret"));
        if (!verified)
            return responseBuilder(res, 200, false);

        const user = await User.findById(verified.id);
        if (!user)
            return responseBuilder(res, 200, false);

        return responseBuilder(res, 200, true);
    } catch (err) {
        return responseBuilder(res, 500, { error: err.message });
    }
});

router.get("/", auth, async (req, res) => {
    try {
        const user = await User.findById(req.user);
        return responseBuilder(res, 200,
            {
                displayName: user.displayName,
                id: user._id,
            });
    }
    catch (err) {
        return responseBuilder(res, 500, { error: err.message });
    }
});







module.exports = router;