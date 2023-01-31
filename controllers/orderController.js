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
        res.render("users/orders", {title: "Orders", sessions});
    }else if(sessions.usertype == "ADMIN"){
        res.render("admin/order", {title: "Orders | Admin", sessions});
    }else{
        res.redirect("/");
    }
};



module.exports = {
    getOrder
};