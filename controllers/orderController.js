const dbcon = require('../db/conn.js');

const getOrder = (req, res)=>{

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
        res.render("admin/order", {title: "Orders | Admin", sessions});
    }else{
        res.redirect("/admin/login");
    }
};



module.exports = {
    getOrder
};