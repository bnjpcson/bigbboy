const getServices = (req, res)=>{
    res.render("services",{title: "Services"});
};


module.exports = {
    getServices
};