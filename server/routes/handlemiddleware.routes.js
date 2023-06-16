const express = require('express');
const middlewareRoute = express.Router();
const session = require("express-session");
const jwt = require('jsonwebtoken');

const {
    User
} = require('../models');


middlewareRoute.get('/', (req, res) => {
    try {
        const token = req.headers.authorization;
        console.log(token);
        if (!token) {
            res.status(200).json({
                success: false,
                message: "Error Token was not provided "
            });
        } else {
            //Decoding the token
            const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
                if (err) {
                    console.log("this error is called");
                    return res.json({
                        expired: "token has been expired"
                    })
                } else {
                    console.log("Email" + decoded.userEmail);


                    //set the middle ware request from the user


                    //set the user sessiion
                    req.session.userId = decoded.userId;
                    req.session.userEmail = decoded.userEmail;
                    console.log("this user id is>>" + decoded.userId);

                    console.log("this part is called")
                    return res.json({
                        isLoggedIn: true
                    })

                }
            });

        }
    } catch (error) {
        console.log(error);
    }


});

module.exports = middlewareRoute;