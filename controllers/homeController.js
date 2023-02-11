const ProductPromise = require('../promises/Product.js');

const getHome = async (req, res)=>{

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
    let latestProd = [];
    let products = await ProductPromise.DBgetProducts();
    if(products != ""){
        for (let index = 0; index < 4; index++) {
            const element = products[index];
            latestProd.push(element);
        }
    }

    

    if(req.session.usertype == "USER"){
        res.render("users/index", {title: "Bigbboy", success, error, latestProd, sessions});
    }else if(req.session.usertype == "ADMIN"){
        res.redirect("admin");
    }else{
        res.render("index", {title: "Bigbboy", success, error, latestProd, sessions});
    }

};




module.exports = {
    getHome
};