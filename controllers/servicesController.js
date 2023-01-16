const getServices = (req, res)=>{

    if(req.session.usertype == "USER"){
        res.render("users/services", {title: "Services"});
    }else if(req.session.usertype == "ADMIN"){
        res.redirect("admin");
    }else{
        res.render("services",{title: "Services"});
    }
};


module.exports = {
    getServices
};