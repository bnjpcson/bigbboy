const dbcon = require('../db/conn.js');
const bcrypt = require('bcrypt');

const getLogin = (req, res)=>{
    const success = req.flash("success");
    const error = req.flash("error");

    if(req.session.usertype == "USER"){
        res.redirect("/");
    }else if(req.session.usertype == "ADMIN"){
        res.redirect("admin");
    }else{
        res.render("login", {title: "Login", success, error});
    }
};

const postLogin = (req, res)=>{

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
        const sql = "SELECT * FROM `users` WHERE username = ? OR email = ?";
        dbcon.query(sql,[username, username], (err, result)=>{
            if(err){
                console.log(err.message);
            }else{
                if(result.length > 0){
                    //login success
                    const id = result[0].user_id;
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
    
                                req.session.user_id = id;
                                req.session.name = name;
                                req.session.username = username;
                                req.session.usertype = "USER";
                                req.session.email = email;

    
                                req.flash("success", "Login Successfully");
                                console.log("Login Successfully");
                                res.redirect("/");
    
                                
                            }else{
                                //user not found
                                console.log("Login Failed");
                                req.flash("error", "Invalid username or password.");
                                res.redirect("/login");
                            }
    
                            
                        }
                    });
    
                    
                }else{
                    //user not found
                    console.log("Login Failed, not found");
                    req.flash("error", "User not found");
                    res.redirect("/login");
                }
                
            }
        });
    }


    
}


module.exports = {
    getLogin,
    postLogin
};