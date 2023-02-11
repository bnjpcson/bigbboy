const dbcon = require('../db/conn.js');
const bcrypt = require('bcrypt');
const SalesPromise = require('../promises/Sales.js');
const AccountPromise = require('../promises/Account.js');
const OrderPromise = require('../promises/Order.js');
const PlaceOrderPromise = require('../promises/PlaceOrder.js');



const randtoken = require('rand-token');
const saltRounds = 10;

const getAdmin = async (req, res)=>{

    let sessions = {
        id : req.session.id,
        name : req.session.name,
        username : req.session.username,
        usertype: req.session.usertype,
        email : req.session.email,
    };

    const success = req.flash("success");
    const error = req.flash("error");

    if(sessions.usertype == "USER"){
        res.redirect("/");
    }else if(sessions.usertype == "ADMIN"){

        let salesReport = await SalesPromise.DBgetSales();
        let users = await AccountPromise.DBgetUsers();
        let orders = await OrderPromise.DBgetOrders();
        let reqOrders = await PlaceOrderPromise.DBgetPlaceOrders("Pending");


        let totalEarnings = 0;
        let totalUsers = 0;
        let totalOrders = 0;
        let totalRequest = 0;



        if(salesReport != ""){
            salesReport.forEach(element => {
                totalEarnings+=element.netIncome;
            });
        }
        if(users != ""){
            totalUsers = users.length;
        }
        if(orders != ""){
            totalOrders = orders.length;
        }
        if(reqOrders != ""){
            totalRequest = reqOrders.length;
        }

        res.render("admin/index", {title: "Dashboard | Admin", sessions, success, error, totalEarnings, totalUsers, totalOrders, totalRequest});
    }else{
        res.redirect("/admin/login")
    }
};

const getAdminLogin = (req, res)=>{
    const success = req.flash("success");
    const error = req.flash("error");

    if(req.session.usertype == "USER"){
        res.render("/");
    }

    res.render("admin/login", {title: "Login | Admin", success, error});

};

const postAdminLogin = (req, res)=>{

    const username = req.body.username;
    const password = req.body.password;

    let error = false;

    if(username == ""){
        console.log("Username/Email Address is required.");
        req.flash("error", "Username is required.");
        error = true;
    }
    if(password == ""){
        console.log("Password is required.");
        req.flash("error", "Password is required.");
        error = true;
    }

    if(error){
        res.redirect("login");
    }else{
        const sql = "SELECT * FROM `admins` WHERE username = ? OR email = ?";
        dbcon.query(sql,[username, username], (err, result)=>{
            if(err){
                console.log(err.message);
            }else{
                if(result.length > 0){
                    //login success
                    const id = result[0].admin_id;
                    const name = result[0].name;
                    const username = result[0].username;
                    const hash = result[0].password;
                    const email = result[0].email;

    
                    bcrypt.compare(password, hash, function(err, match) {
                        // result == true
                        if(err){
                            console.log(err.message);
                        }else{
    
                            if(match){
    
                                req.session.admin_id = id;
                                req.session.name = name;
                                req.session.username = username;
                                req.session.usertype = "ADMIN";
                                req.session.email = email;

    
                                req.flash("success", "Login Successfully");
                                console.log("Login Successfully");
                                res.redirect("/admin");
    
                                
                            }else{
                                //user not found
                                console.log("Login Failed");
                                req.flash("error", "Invalid username or password.");
                                res.redirect("/admin/login");
                            }
    
                            
                        }
                    });
    
                    
                }else{
                    //user not found
                    console.log("Login Failed, not found");
                    req.flash("error", "User not found");
                    res.redirect("/admin/login");
                }
                
            }
        });
    }


    
}


module.exports = {
    getAdminLogin,
    postAdminLogin,
    getAdmin
};