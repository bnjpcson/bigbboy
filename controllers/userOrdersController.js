const OrderPromise = require('../promises/Order.js');
const AccountPromise = require('../promises/Account.js');
const ProductPromise = require('../promises/Product.js');
const UserOrderPromise = require('../promises/UserOrder.js');






const getUserOrders = async (req, res)=>{

    let sessions = {
        user_id : req.session.user_id,
        name : req.session.name,
        username : req.session.username,
        usertype: req.session.usertype,
        email : req.session.email,
    };

    const success = req.flash("success");
    const error = req.flash("error");

    let data = await OrderPromise.DBselectAllOrder();
    let selected = "";
    let users = await AccountPromise.DBgetUsers();
    let products = await ProductPromise.DBgetProducts();




    if(sessions.usertype == "USER"){

        res.redirect("/");
        

    }else if(sessions.usertype == "ADMIN"){

        res.render("admin/userOrders", {title: "User Orders | Admin", sessions, success, error, data, selected, users,products  });

    }else{
        res.redirect("/");
    }
};

const postUserOrders = async (req, res)=>{

    let req_data = {
        user_id : req.body.user_id,
        prod_id : req.body.prod_id,
        qty : req.body.quantity,
        order_id : req.body.order_id,
    };

    let order = await OrderPromise.DBselectLastOrder(req_data.user_id);

    if(order != ""){
        //meron, add to cart
        req_data.order_id = order[0].order_id;

        let product = await ProductPromise.DBselectProduct(req_data.prod_id);   
        if(product != ""){
            try {
                await UserOrderPromise.DBaddUserOrder(req_data);   
                req.flash("success", "Your order was added successfully!");
                res.redirect("/admin/userorders");
            } catch (error) {
                console.log(error);
                await req.flash("error", "Failed to add your order.");
                res.redirect("/admin/userorders");
            }

        }else{
            await req.flash("error", "ID not found!");
            res.redirect("/admin/userorders");
        }

    }else{
        //wala, create order
        try {
            await OrderPromise.DBaddOrder(req_data.user_id);
            
        } catch (error) {
            console.log(error);
            res.redirect("/admin/userorders");

        }

        let order = await OrderPromise.DBselectLastOrder(req_data.user_id);
        req_data.order_id = order[0].order_id;
        let product = await ProductPromise.DBselectProduct(req_data.prod_id);   
        if(product != ""){
            try {
                await UserOrderPromise.DBaddUserOrder(req_data);   
                req.flash("success", "Your order was added successfully!");
                res.redirect("/admin/userorders");
            } catch (error) {
                console.log(error);
                await req.flash("error", "Failed to add your order.");
                res.redirect("/admin/userorders");
            }

        }else{
            await req.flash("error", "ID not found!");
            res.redirect("/admin/userorders");
        }
    }
}


module.exports = {
    getUserOrders,
    postUserOrders
};