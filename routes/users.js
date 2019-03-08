const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const config = require("../config/database")
const User = require("../model/user");

router.post("/register", (req, res, next) => {
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    })

    User.addUser(newUser, (err, user) => {
        if(err){
            res.json({succes: false, msg: "Failed to register user."})
        } else {
            res.json({success: true, msg:"User registered"})
        }
    });
});

router.post("/authenticate", (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username, (err, user) => {
        if(err) throw err;
        if(!user) {
            // Return respones
            return res.json({success: false, msg: "User not found"});
        }
        User.comparePassword(password, user.password, (err, isMatch) => {
            if(err) throw err;
            if(isMatch){
                // Create token
                const token = jwt.sign(user, database.secret, {
                    expiresIn: 604800
            });
            res.json({
                succes: true,
                token: "JWT" + token,
                user: {
                    id: user._id,
                    name: user.name,
                    username: user.username,
                    email: user.email
                }
            });
        } else {
            return res.json({success: false, msg: "Wrong Password"});
        }
        });
    });
});

router.get("/profile", (req, res, next) => {
    res.send("<h1>Profile/h1>");
});



module.exports = router;