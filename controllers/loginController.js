const getLogin = (req, res)=>{
    res.render("login",{title: "Login"});
};


module.exports = {
    getLogin
};