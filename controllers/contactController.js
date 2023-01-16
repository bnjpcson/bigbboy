const getContact = (req, res)=>{
    if(req.session.usertype == "USER"){
        res.render("users/contact", {title: "Contact"});
    }else if(req.session.usertype == "ADMIN"){
        res.redirect("admin");
    }else{
        res.render("contact", {title: "Contact"});
    }
};


module.exports = {
    getContact
};