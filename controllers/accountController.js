const AccountPromise = require('../promises/Account.js');
const bcrypt = require('bcrypt');
const randtoken = require('rand-token');
const saltRounds = 10;

const getAccounts = async (req, res)=>{

    const id = req.params.id;
    const op = req.params.op;
    
    let users = await AccountPromise.DBgetUsers();
    let admins = await AccountPromise.DBgetAdmins();

    
    let selectedUser = "";
    let selectedAdmin = "";
    let selectedDelUser = "";
    let selectedDelAdmin = "";

    if(id != "" && op == "edit-user"){
        selectedUser = await AccountPromise.DBselectUser(id);
    }
    if(id != "" && op == "delete-user"){
        selectedDelUser = await AccountPromise.DBselectUser(id);
    }
    if(id != "" && op == "edit-admin"){
        selectedAdmin = await AccountPromise.DBselectAdmin(id);
    }
    if(id != "" && op == "delete-admin"){
        selectedDelAdmin = await AccountPromise.DBselectAdmin(id);
    }

    const success = req.flash("success");
    const error = req.flash("error");

    let sessions = {
        id : req.session.id,
        name : req.session.name,
        username : req.session.username,
        usertype: req.session.usertype,
        email : req.session.email,
    };

    if(sessions.usertype == "USER"){
        res.redirect("/");
    }else if(sessions.usertype == "ADMIN"){
        res.render("admin/accounts", {title: "Manage Accounts | Admin", users: users, admins: admins, sessions, selectedUser, selectedAdmin, selectedDelUser, selectedDelAdmin, success, error});
    }else{
        res.redirect("/admin/login");
    }
    
};


const postAddUser = async (req, res)=>{

    const user = {
        name : req.body.name,
        username : req.body.username,
        email : req.body.email,
        phonenum : req.body.phonenum,
        password : req.body.password
    };

    let checkEmail = await AccountPromise.DBselectUserEmail(user.email);

    if(checkEmail != ""){
        console.log("Existing email address");
        req.flash("error", "Email is already taken.");
        res.redirect("/admin/accounts");

    }else{
        bcrypt.hash(user.password, saltRounds, async function(err, hash){
            if(err){
                console.log(err.message);
            }else{
                user.password = hash;
                try {
                    await AccountPromise.DBaddUsers(user);   
                    await req.flash("success", "User inserted successfully.");
                    res.redirect("/admin/accounts");

                } catch (error) {
                    await req.flash("error", "Failed to insert user.");
                    res.redirect("/admin/accounts");
                }
            }
        });
    }

}

const postEditUser = async (req, res)=>{

    const user = {
        user_id : req.body.user_id,
        name : req.body.name,
        username : req.body.username,
        email : req.body.email,
        phonenum : req.body.phonenum
    }
    let check = await AccountPromise.DBselectUser(user.user_id);

    if(check != ""){
        try {
            await AccountPromise.DBupdateUser(user);   
            await req.flash("success", "User updated successfully.");
            res.redirect("/admin/accounts");
        } catch (error) {
            await req.flash("error", "Failed to update user.");
            res.redirect("/admin/accounts");
        }

    }else{
        console.log("ID NOT FOUND!");
        req.flash("error", "Invalid User ID");
        res.redirect("/admin/accounts");
    }
    
};

const postDeleteUser = async (req, res)=>{

    const user_id = req.body.user_id;

    let check = await AccountPromise.DBselectUser(user_id);

    if(check != ""){
        try {
            await AccountPromise.DBdeleteUser(user_id);   
            await req.flash("success", "User deleted successfully.");
            res.redirect("/admin/accounts");
        } catch (error) {
            await req.flash("error", "Failed to delete user.");
            res.redirect("/admin/accounts");
        }

    }else{
        console.log("ID NOT FOUND!");
        req.flash("error", "Invalid User ID");
        res.redirect("/admin/accounts");
    }
   
    
};

const postAddAdmin = async (req, res)=>{

    const admin = {
        name : req.body.name,
        username : req.body.username,
        email : req.body.email,
        phonenum : req.body.phonenum,
        password : req.body.password
    };

    let checkEmail = await AccountPromise.DBselectAdminEmail(admin.email);

    if(checkEmail != ""){
        console.log("Existing email address");
        req.flash("error", "Email is already taken.");
        res.redirect("/admin/accounts");

    }else{
        bcrypt.hash(admin.password, saltRounds, async function(err, hash){
            if(err){
                console.log(err.message);
            }else{
                admin.password = hash;
                try {
                    await AccountPromise.DBaddAdmin(admin);   
                    await req.flash("success", "Admin inserted successfully.");
                    res.redirect("/admin/accounts");

                } catch (error) {
                    await req.flash("error", "Failed to insert admin.");
                    res.redirect("/admin/accounts");
                }
            }
        });
    }

}

const postEditAdmin = async (req, res)=>{

    const admin = {
        admin_id : req.body.admin_id,
        name : req.body.name,
        username : req.body.username,
        email : req.body.email,
        phonenum : req.body.phonenum
    }
    let check = await AccountPromise.DBselectAdmin(admin.admin_id);

    if(check != ""){
        try {
            await AccountPromise.DBupdateAdmin(admin);   
            await req.flash("success", "Admin updated successfully.");
            res.redirect("/admin/accounts");
        } catch (error) {
            await req.flash("error", "Failed to update admin.");
            res.redirect("/admin/accounts");
        }

    }else{
        console.log("ID NOT FOUND!");
        req.flash("error", "Invalid User ID");
        res.redirect("/admin/accounts");
    }
    
};

const postDeleteAdmin = async (req, res)=>{

    const admin_id = req.body.admin_id;

    let check = await AccountPromise.DBselectAdmin(admin_id);

    if(check != ""){
        try {
            await AccountPromise.DBdeleteAdmin(admin_id);   
            await req.flash("success", "Admin deleted successfully.");
            res.redirect("/admin/accounts");
        } catch (error) {
            await req.flash("error", "Failed to delete admin.");
            res.redirect("/admin/accounts");
        }

    }else{
        console.log("ID NOT FOUND!");
        req.flash("error", "Invalid User ID");
        res.redirect("/admin/accounts");
    }
   
    
};



module.exports = {
    getAccounts,
    postAddUser,
    postEditUser,
    postDeleteUser,
    postAddAdmin,
    postEditAdmin,
    postDeleteAdmin
};