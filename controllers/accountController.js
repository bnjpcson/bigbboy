const AccountModel = require('../models/AccountModel.js');

const getAccounts = async (req, res)=>{
    
    const getusers = AccountModel.DBgetUsers;
    const getadmins = AccountModel.DBgetAdmins;

    let users = "";
    let admins = "";
    await getusers().then((data) => {
        users = data;
    }).catch((err) => {
        console.log(err.message);
    });

    await getadmins().then((data) => {
        admins = data;
    }).catch((err) => {
        console.log(err.message);
    });

    let credentials = {
        id : req.session.id,
        name : req.session.id,
        username : req.session.username,
        usertype: req.session.usertype,
        email : req.session.email,
    };

    if(req.session.usertype == "USER"){
        res.redirect("/");
    }else if(req.session.usertype == "ADMIN"){
        res.render("admin/accounts", {title: "Manage Accounts | Admin", users: users, admins: admins, credentials});
    }else{
        res.redirect("/admin/login");
    }




    
};

const getAccountsUser = (req, res)=>{
    var sql = "SELECT * FROM `users`";
    dbcon.query(sql, (err, data)=>{
        if(err){
            console.log(err.message);
        }else{
            console.log(data);
            res.json({
                data: data
            });
            res.end();
        }
    });
};



module.exports = {
    getAccounts,
    getAccountsUser
};