const dbcon = require('../db/conn.js');
const AccountPromise = require('../promises/Account.js');
const ProductPromise = require('../promises/Product.js');
const SalesPromise = require('../promises/Sales.js');


const getSales = async (req, res)=>{

    let sessions = {
        id : req.session.id,
        name : req.session.name,
        username : req.session.username,
        usertype: req.session.usertype,
        email : req.session.email,
    };

    let order_id = req.params.order_id;
    let op = req.params.op;
 
    let products = await ProductPromise.DBgetProducts();
    let customers = await AccountPromise.DBgetUsers();
    let salesSummary = "";
    let salesReport = await SalesPromise.DBgetSales();

    if(order_id != "" && op == "view"){
        salesSummary = await SalesPromise.DBselectSale(order_id);
    }

    if(sessions.usertype == "USER"){
        res.redirect("/");
    }else if(sessions.usertype == "ADMIN"){

        res.render("admin/sales", {title: "Sales Report | Admin", sessions, products, customers, salesSummary, salesReport});
    }else{
        res.redirect("/admin/login");
    }
};



module.exports = {
    getSales
};