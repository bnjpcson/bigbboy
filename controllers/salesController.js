const dbcon = require('../db/conn.js');
const AccountPromise = require('../promises/Account.js');
const ProductPromise = require('../promises/Product.js');

const getSales = async (req, res)=>{

    let sessions = {
        id : req.session.id,
        name : req.session.name,
        username : req.session.username,
        usertype: req.session.usertype,
        email : req.session.email,
    };

    let products = await ProductPromise.DBgetProducts();
    let customers = await AccountPromise.DBgetUsers();


    if(sessions.usertype == "USER"){
        res.redirect("/");
    }else if(sessions.usertype == "ADMIN"){
        res.render("admin/sales", {title: "Sales Report | Admin", sessions, products, customers});
    }else{
        res.redirect("/admin/login");
    }
};



module.exports = {
    getSales
};