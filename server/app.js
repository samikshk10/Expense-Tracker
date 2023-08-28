const express = require("express");
const cors = require('cors');
const bodyParser = require("body-parser");
const flash = require("connect-flash");
const helmet = require("helmet");
const session = require("express-session");

const authRouter = require("./routes/auth.routes");
const handlemiddlewareRouter = require("./routes/handlemiddleware.routes");
const expenseRouter = require('./routes/expense.routes');
const incomeRouter = require('./routes/income.routes');


const sequelize = require('./sequelizesetup');
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
app.use(cors({origin:"https://expensestracker.samikshk.com"}));

app.use("/api", authRouter);
app.use("/handlemiddleware", handlemiddlewareRouter);
app.use('/api', expenseRouter);
app.use('/api', incomeRouter);
app.get('/home',(req,res)=>{
    res.send("this app is working");
});
const initApp = async () => {
    console.log("Testing the database connection..");
    try {
      await sequelize.authenticate();
      console.log("Connection has been established successfully.");
      app.listen(PORT, () => {
        console.log(`Server is up and running at: http://localhost:${PORT}`);
      });
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  };
  initApp();
