const bcrypt = require("bcrypt");
const {
    User
} = require("../models");
const jwt = require('jsonwebtoken')
const generateToken = (id, email) => {
    return jwt.sign({
        userId: id,
        userEmail: email
    }, process.env.TOKEN_SECRET, {
        expiresIn: '1800s'
    })
}

async function handlelogin(req, res) {
    try {
        if (req.body.email && req.body.password) {

            if (req.body.password.length < 8) {
                return res.json({
                    type: "danger",
                    msg: "Password must be at least 8 characters"
                })
            }
            const user = await User.findOne({
                where: {
                    email: req.body.email,
                }
            });
            if (!user) {
                return res.json({
                    type: "danger",
                    msg: "User not found"
                })
            }

            const isValidPassword = await bcrypt.compare(req.body.password, user.password);
            if (!isValidPassword) {
                return res.json({
                    type: "danger",
                    msg: "Incorrect Email or Password"
                })
            } else {
                req.session.userId = user.id;
                req.session.isLoggedIn = true;
                console.log("user id >>>" + user.id);
                const token = generateToken(user.id, user.email);
                return res.json({
                    isLoggedIn: req.session.isLoggedIn,
                    token: token,
                    userid: user.id,
                    userName: user.firstName
                });
            }
        }



    } catch (error) {
        console.log(error);
    }
}

async function handlesignup(req, res) {
    try {

        if (req.body.password.length < 8) {
            return res.json({
                type: "danger",
                msg: "Password must be at least 8 characters"
            })
        }

        const emailexists = await User.findOne({
            where: {
                email: req.body.email
            }
        });
        if (emailexists != null) {
            return res.json({
                type: "danger",
                msg: "Email already exists"
            })
        }


        console.log("email" + emailexists);

        const hashedpassword = await bcrypt.hash(req.body.password, 10);
        const user = await User.create({

            firstName: req.body.firstName,
            lastName: req.body.lastName,
            username: "samik",
            email: req.body.email,
            password: hashedpassword,
            role: "user",
            status: "verified"
        });

        res.json({
            type: 'success',
            msg: "user created successfully"
        });
        // res.send("insert" + user);
    } catch (err) {

        res.json({
            type: 'danger',
            msg: "Failed to create User"

        });

    }
}

module.exports = {
    handlelogin,
    handlesignup
}