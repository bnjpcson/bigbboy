
const getHome = (req, res)=>{

    if(req.session.usertype == "USER"){
        res.render("users/index", {title: "Bigbboy"});
    }else if(req.session.usertype == "ADMIN"){
        res.redirect("admin");
    }else{
        res.render("index", {title: "Bigbboy"});
    }

};




module.exports = {
    getHome
};