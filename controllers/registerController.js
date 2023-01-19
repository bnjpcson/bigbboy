const dbcon = require('../db/conn.js');
const bcrypt = require('bcrypt');
const randtoken = require('rand-token');
const saltRounds = 10;

const getRegister = (req, res)=>{
    const success = req.flash("success");
    const error = req.flash("error");

    if(req.session.usertype == "USER"){
        res.redirect("/");
    }else if(req.session.usertype == "ADMIN"){
        res.redirect("admin");
    }else{
        res.render("register",{title: "Register", success: success, error: error});
    }
};

const postRegister = (req, res)=>{

    const name = req.body.name;
    const username = req.body.username;
    const phonenum = req.body.phonenum;
    const email = req.body.email;
    const password = req.body.password;

    let error = false;

    if(name == ""){
        console.log("Name is required.");
        req.flash("error", "Name Field is required.");
        error = true;
    }

    if(username == ""){
        console.log("Username is required.");
        req.flash("error", "Username Field is required.");
        error = true;
    }

    if(phonenum == ""){
        console.log("Phone Number is required.");
        req.flash("error", "Phone Number Field is required.");
        error = true;
    }

    if(email == ""){
        console.log("Email is required.");
        req.flash("error", "Email Field is required.");
        error = true;
    }

    if(password == ""){
        console.log("Password is required.");
        req.flash("error", "Password Field is required.");
        error = true;
    }

    if(error){
        res.redirect("register");
    }else{
        const sql = "SELECT * FROM `users` WHERE email = ?";
        dbcon.query(sql, [email], (err, result)=>{
            if(err) console.log(err.message);
            else{
                if(result.length>0){
                    //existing
                    console.log("Existing email address");
                    req.flash("error", "Email is already taken.");
                    res.redirect("register");


                }else{
                    bcrypt.hash(password, saltRounds, function(err, hash) {
                        if(err){
                            console.log(err.message);
                        }else{
                            const sql = "INSERT INTO users (name, username, email, phonenum, password) VALUES (?,?,?,?,?)";
                            
                            dbcon.query(sql,[name, username, email, phonenum, hash], (err)=>{
                                if(err){
                                    console.log(err.message);
                                }else{
                                    req.flash("success", "Your account has been created");
                                    console.log("User Inserted Successfully");
                                    res.redirect("/login");
                                }
                            });
                        }
                        
                    });

                    
                }
                
            }
        });
    }

    

    
   
}

module.exports = {
    getRegister,
    postRegister
};