const getContact = (req, res)=>{
    res.render("contact",{title: "Contact"});
};


module.exports = {
    getContact
};