const PlaceOrderPromise = require('../promises/PlaceOrder.js');
const UserOrderPromise = require('../promises/UserOrder.js');
const OrderPromise = require('../promises/Order.js');


const getCart = async (req, res) =>{

    const success = req.flash("success");
    const error = req.flash("error");
    
    let sessions = {
        user_id : req.session.user_id,
        admin_id : req.session.admin_id,
        name : req.session.name,
        username : req.session.username,
        usertype: req.session.usertype,
        email : req.session.email,
    };

    let checkout = "";
    let totalSum = "";

    if(req.params.checkout == "checkout"){
        checkout = await UserOrderPromise.DBselectUserOrders(sessions.user_id);
        totalSum = await UserOrderPromise.DBgetTotalSum(sessions.user_id, checkout[0].order_id);
    }

    let userOrders = await UserOrderPromise.DBselectUserOrders(sessions.user_id);

    if(sessions.usertype == "USER"){
        res.render("users/mycart", {title: "My Cart", userOrders, sessions, success, error, checkout, totalSum});
    }else{
        res.redirect("/");
    }
    
}

const getCountCart = async (req, res)=>{
    
    let sessions = {
        user_id : req.session.user_id,
        name : req.session.name,
        username : req.session.username,
        usertype: req.session.usertype,
        email : req.session.email,
    };

    let cart = await UserOrderPromise.DBselectUserOrders(sessions.user_id);
    
    res.json(cart);
    res.end();
};

const getRemoveOrder = async (req, res)=>{
    
    let sessions = {
        user_id : req.session.user_id,
        name : req.session.name,
        username : req.session.username,
        usertype: req.session.usertype,
        email : req.session.email,
    };

    const userOrders_id = req.params.userOrders_id;

    if(userOrders_id != ""){
        await UserOrderPromise.DBdeleteUserOrder(userOrders_id);
        res.redirect("/user/cart");
    }else{
        res.redirect("/user/cart");
    }
    


    
    
};

const updateQuantity = async (req, res)=>{

    const req_data = {
        userOrders_id : req.params.userOrders_id,
        quantity : req.params.quantity,
    }


    try {
        await UserOrderPromise.DBupdateOrderQuantity(req_data);

    } catch (error) {
        console.log(error);
    }

    res.send(req.params.userOrders_id);
    res.end();
};

const getSum = async (req, res)=>{

    let sessions = {
        user_id : req.session.user_id,
        name : req.session.name,
        username : req.session.username,
        usertype: req.session.usertype,
        email : req.session.email,
    };

    let order = await OrderPromise.DBselectLastOrder(sessions.user_id);
    let sum = "";
    if(order != ""){
        sum = await UserOrderPromise.DBgetTotalSum(sessions.user_id, order[0].order_id);
    }
    
    res.json(sum);
    res.end();
};


const postPlaceOrder = async (req, res)=>{

    let req_data = {
        order_id: req.body.order_id,
        order_total: req.body.order_total,
        p_method: req.body.p_method,
    }

    try {
        await OrderPromise.DBupdateDoneOrders(req_data.order_id);
        
        await PlaceOrderPromise.DBaddPlaceOrder(req_data);
        req.flash("success", "Your order was added successfully.");
        res.redirect("/user/cart");


    } catch (error) {
        console.log(error);
        req.flash("error", "Failed to add your order.");
        res.redirect("/user/cart");
    }


};



module.exports = {
    getCountCart,
    getRemoveOrder,
    updateQuantity,
    getSum,
    getCart,
    postPlaceOrder
};