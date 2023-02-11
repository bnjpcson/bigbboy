const getContact = (req, res)=>{


    
    let sessions = {
        user_id : req.session.user_id,
        admin_id : req.session.admin_id,
        name : req.session.name,
        username : req.session.username,
        usertype: req.session.usertype,
        email : req.session.email,
    };

    if(req.session.usertype == "USER"){
        res.render("users/contact", {title: "Contact", sessions});
    }else if(req.session.usertype == "ADMIN"){
        res.redirect("admin");
    }else{
        res.render("contact", {title: "Contact"});
    }
};


module.exports = {
    getContact
};