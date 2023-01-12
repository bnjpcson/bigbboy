const getProducts = (req, res)=>{
    res.render("products",{title: "Products"});
};


module.exports = {
    getProducts
};