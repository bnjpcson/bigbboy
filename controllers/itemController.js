const dbcon = require('../db/conn.js');

const getItem = (req, res)=>{

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
        res.render("admin/items", {title: "Items | Admin", credentials});
    }else{
        res.redirect("/admin/login");
    }
};



module.exports = {
    getItem
};