const dbcon = require('../db/conn.js');
const UserOrderPromise = require('../promises/UserOrder.js');
const PlaceOrderPromise = require('../promises/PlaceOrder.js');


const getOrder = async (req, res)=>{

    let sessions = {
        user_id : req.session.user_id,
        name : req.session.name,
        username : req.session.username,
        usertype: req.session.usertype,
        email : req.session.email,
    };

    let userPlacedOrders = await PlaceOrderPromise.DBgetUserPlaceOrders(sessions.user_id);

    console.log(userPlacedOrders);

    if(sessions.usertype == "USER"){
        res.render("users/orders", {title: "Orders", sessions, userPlacedOrders});
    }else if(sessions.usertype == "ADMIN"){
        res.render("admin/order", {title: "Orders | Admin", sessions});
    }else{
        res.redirect("/");
    }
};



module.exports = {
    getOrder
};