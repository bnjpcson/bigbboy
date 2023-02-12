const dbcon = require('../db/conn.js');
const UserOrderPromise = require('../promises/UserOrder.js');
const PlaceOrderPromise = require('../promises/PlaceOrder.js');
const randtoken = require('rand-token').generator({
    chars: '0-9'
});
const saltRounds = 10;



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

        let pendingPlacedOrders = await PlaceOrderPromise.DBgetPlaceOrders("Pending");
        let canceledPlacedOrders = await PlaceOrderPromise.DBgetPlaceOrders("Canceled");
        let acceptedPlacedOrders = await PlaceOrderPromise.DBgetPlaceOrders("Accepted");
        let declinedPlacedOrders = await PlaceOrderPromise.DBgetPlaceOrders("Declined");
        let completedPlacedOrders = await PlaceOrderPromise.DBgetPlaceOrders("Completed");

        let placedorder_id = req.params.placedorder_id;
        let op = req.params.op;

        let viewOrder = "";
        if(placedorder_id != "" && op == "view"){
            viewOrder = await PlaceOrderPromise.DBviewUserPlaceOrder(placedorder_id);
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
            
            await PlaceOrderPromise.DBsetStatusPlaceOrder("Accepted", placedorder_id);

            res.redirect("/admin/orders");
            return;
        }
        if(placedorder_id != "" && op == "decline"){
            await PlaceOrderPromise.DBsetStatusPlaceOrder("Declined",placedorder_id);
            res.redirect("/admin/orders");
            return;
        }
        // if(placedorder_id != "" && op == "complete"){
        //     // let ref_number = randtoken.generate(10);
        //     let ref_number = "";
        //     await PlaceOrderPromise.DBsetStatusPlaceOrder("Completed",placedorder_id);
        //     await PlaceOrderPromise.DBcompleteOrder(placedorder_id, ref_number);
        //     res.redirect("/admin/orders");
        //     return;
        // }

        res.render("admin/order", {title: "Orders | Admin", sessions, pendingPlacedOrders, canceledPlacedOrders, acceptedPlacedOrders, declinedPlacedOrders, completedPlacedOrders, viewOrder});

    }else{
        res.redirect("/");
    }
};

const postOrder = async (req, res) => {


    const placedorder_id = req.body.place_orderid;
    const ref_number = req.body.ref_number;

    try {
        await PlaceOrderPromise.DBsetStatusPlaceOrder("Completed",placedorder_id);
        await PlaceOrderPromise.DBcompleteOrder(placedorder_id, ref_number);
    } catch (error) {
        console.log(error);
    }
    res.redirect("/admin/orders");
}



module.exports = {
    getOrder,
    postOrder
};