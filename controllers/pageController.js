const dbcon = require('../db/conn.js');

const getHomePage = (req, res)=>{
    if(req.session.usertype == "USER"){
        res.redirect("/");
    }else if(req.session.usertype == "ADMIN"){
        res.render("admin/homepage", {title: "Pages | Admin"});
    }else{
        res.redirect("/admin/login");
    }
};



module.exports = {
    getHomePage
};