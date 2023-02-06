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

   


    if(sessions.usertype == "USER"){

        let userPlacedOrders = await PlaceOrderPromise.DBgetUserPlaceOrders(sessions.user_id);


        let placedorder_id = req.params.placedorder_id;
        let op = req.params.op;
    
        let viewOrder = "";
        if(placedorder_id != "" && op == "view"){
            viewOrder = await PlaceOrderPromise.DBviewUserPlaceOrder(placedorder_id);
        }
        if(placedorder_id != "" && op == "cancel"){
            await PlaceOrderPromise.DBcancelPlaceOrder(placedorder_id);
            res.redirect("/user/orders");
        }
        res.render("users/orders", {title: "Orders", sessions, userPlacedOrders, viewOrder});

    }else if(sessions.usertype == "ADMIN"){

        let pendingPlacedOrders = await PlaceOrderPromise.DBgetPendingPlaceOrders();
        let canceledPlacedOrders = await PlaceOrderPromise.DBgetCanceledPlaceOrders();
        let approvedPlacedOrders = await PlaceOrderPromise.DBgetApprovedPlaceOrders();

        let placedorder_id = req.params.placedorder_id;
        let op = req.params.op;

        let viewOrder = "";
        if(placedorder_id != "" && op == "view"){
            viewOrder = await PlaceOrderPromise.DBviewUserPlaceOrder(placedorder_id);
            console.log(viewOrder);
        }
        if(placedorder_id != "" && op == "accept"){

            let userOrders = await PlaceOrderPromise.DBviewUserPlaceOrder(placedorder_id);

            try {
                await userOrders.forEach(async element => {
                    await PlaceOrderPromise.DBsoldProduct(element.quantity, element.prod_id);
                });
            } catch (error) {
                console.log(error);
                return;
            }
            
            await PlaceOrderPromise.DBapprovePlaceOrder(placedorder_id);

            res.redirect("/admin/orders");
            return;
        }
        if(placedorder_id != "" && op == "cancel"){
            await PlaceOrderPromise.DBcancelPlaceOrder(placedorder_id);
            res.redirect("/admin/orders");
            return;
        }

        res.render("admin/order", {title: "Orders | Admin", sessions, pendingPlacedOrders, canceledPlacedOrders, approvedPlacedOrders, viewOrder});

    }else{
        res.redirect("/");
    }
};



module.exports = {
    getOrder
};