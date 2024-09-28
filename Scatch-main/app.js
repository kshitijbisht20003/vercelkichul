const express = require("express");
const app = express();
const flash = require("connect-flash");
const expressSession = require("express-session");


const cookieParser = require("cookie-parser")
const path = require("path");
const db = require("./config/mongoose-connection")

const ownersRouter = require("./routes/ownersRoute")
const usersRouter = require("./routes/usersRouter")
const productRouter = require("./routes/productRouter")
const index = require("./routes/index")

require("dotenv").config();

app.use(expressSession({
  secret:process.env.JWT_KEY,
  resave:false,
  saveUninitialized:false,
}));

app.use(flash());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname,"public")));
app.set("view engine","ejs");
app.use("/owners", ownersRouter);
app.use("/users", usersRouter);
app.use("/products", productRouter);
app.use("/",index);




app.listen(3000);