const getHome = (req, res)=>{
    res.render("index",{title: "Bigbboy"});
};


module.exports = {
    getHome
};