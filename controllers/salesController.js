const dbcon = require('../db/conn.js');

const getSales = (req, res)=>{

    let sessions = {
        id : req.session.id,
        name : req.session.name,
        username : req.session.username,
        usertype: req.session.usertype,
        email : req.session.email,
    };

    if(sessions.usertype == "USER"){
        res.redirect("/");
    }else if(sessions.usertype == "ADMIN"){
        res.render("admin/sales", {title: "Sales Report | Admin", sessions});
    }else{
        res.redirect("/admin/login");
    }
};



module.exports = {
    getSales
};