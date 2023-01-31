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
    saveUninitialized: true,
    cookie: {
        maxAge: 1 * 86400000, // 30 * (24 * 60 * 60 * 1000) = 30 * 86400000 => session is stored 1 day
    }
}));

app.use(flash());

app.use(mainRoute);


app.use((req, res)=>{
    res.render("404", {title: "Page Not Found"});
});