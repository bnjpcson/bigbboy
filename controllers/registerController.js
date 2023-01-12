const getRegister = (req, res)=>{
    res.render("register",{title: "Register"});
};


module.exports = {
    getRegister
};