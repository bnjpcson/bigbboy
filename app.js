const express = require('express');
const cookie = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');


const app = express();
const port = 5000;
const mainRoute = require('./routes/mainRoute.js');
app.listen(port,(req, res)=>{
    console.log(`App is listening to port ${port}`);
});

app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.use(cookie("abcd"));
app.use(session({
    secret: "abcd",
    resave: false,
    saveUninitialized: true
}));

app.use(flash());

app.use(mainRoute);


app.use((req, res)=>{
    res.render("users/404", {title: "Page Not Found"});
});