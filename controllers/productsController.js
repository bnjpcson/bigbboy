const getProducts = (req, res)=>{

    if(req.session.usertype == "USER"){
        res.render("users/products", {title: "Products"});
    }else if(req.session.usertype == "ADMIN"){
        res.redirect("admin");
    }else{
        res.render("products",{title: "Products"});
    }
};


module.exports = {
    getProducts
};