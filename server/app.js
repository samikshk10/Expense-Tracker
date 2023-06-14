const express = require("express");
const cors = require('cors');
const bodyParser = require("body-parser");
const flash = require("connect-flash");
const helmet = require("helmet");
const session = require("express-session");

const authRouter = require("./routes/auth.routes");

const app = express();
require('dotenv').config();

const PORT = process.env.PORT;


//middleware
app.use(helmet());

app.use(express.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(
    session({
        name: "auth-session",
        secret: "secret-key",
        saveUninitialized: true,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24
        },
        resave: false,
    })
);
app.use(flash());
app.use(cors());

app.use("/", authRouter);

app.listen(PORT || 8000, () => {
    console.log("server is  running at port" + PORT || 8000)
})