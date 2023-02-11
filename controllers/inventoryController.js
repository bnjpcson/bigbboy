const InventoryPromise = require('../promises/Inventory.js');


const getActivityLog = async (req, res)=>{

    let sessions = {
        user_id : req.session.user_id,
        admin_id : req.session.admin_id,
        name : req.session.name,
        username : req.session.username,
        usertype: req.session.usertype,
        email : req.session.email,
    };

    const success = req.flash("success");
    const error = req.flash("error");

    let inventory = await InventoryPromise.DBgetInventoryLog();

    if(sessions.usertype == "USER"){
        res.redirect("/");
    }else if(sessions.usertype == "ADMIN"){
        res.render("admin/inventorylog", {title: "Activity Log | Admin", success, error, sessions, inventory});
    }else{
        res.redirect("/");
    }

    
};




module.exports = {
    getActivityLog
};