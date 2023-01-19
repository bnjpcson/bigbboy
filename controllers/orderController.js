const dbcon = require('../db/conn.js');

const getOrder = (req, res)=>{

    let credentials = {
        id : req.session.id,
        name : req.session.id,
        username : req.session.username,
        usertype: req.session.usertype,
        email : req.session.email,
    };

    if(req.session.usertype == "USER"){
        res.redirect("/");
    }else if(req.session.usertype == "ADMIN"){
        res.render("admin/order", {title: "Orders | Admin", credentials});
    }else{
        res.redirect("/admin/login");
    }
};



module.exports = {
    getOrder
};