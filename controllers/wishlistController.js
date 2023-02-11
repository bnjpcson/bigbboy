const WishlistPromise = require('../promises/Wishlist.js');


const getWishList = async (req, res)=>{

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

    let data = await WishlistPromise.DBgetWishlist();

    if(sessions.usertype == "USER"){
        res.render("users/wishlist", {title: "Wishlist", sessions, success, error, data});
    }else if(sessions.usertype == "ADMIN"){
        res.render("admin/wishlist", {title: "Wishlist | Admin", success, error});
    }else{
        res.redirect("/");
    }
    
};

const postWishList = async (req, res)=>{
    
    const wish = req.body.wish;
    const user_id = req.body.user_id;


    try {
        await WishlistPromise.DBinsertWishlist(user_id, wish);   
        await req.flash("success", "Your wish inserted successfully.");
        res.redirect("/user/wishlist");

    } catch (error) {
        console.log(error);
        await req.flash("error", "Failed to insert your wish.");
        res.redirect("/user/wishlist");
    }
    
};

const deleteWishList = async (req, res)=>{

    const wishlist_id = req.params.wishlist_id;

    try {
        await WishlistPromise.DBdeleteWishlist(wishlist_id);   
        await req.flash("success", "Your wish deleted successfully.");
        res.redirect("/user/wishlist");

    } catch (error) {
        console.log(error);
        await req.flash("error", "Failed to delete your wish.");
        res.redirect("/user/wishlist");
    }
    
};



module.exports = {
    getWishList,
    postWishList,
    deleteWishList
};