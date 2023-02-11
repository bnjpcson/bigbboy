const ProductPromise = require('../promises/Product.js');
const AccountPromise = require('../promises/Account.js');
const UserOrderPromise = require('../promises/UserOrder.js');


const getProfile = async (req, res)=>{

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

    let user = await AccountPromise.DBselectUser(sessions.user_id);
    let admin = await AccountPromise.DBselectAdmin(sessions.admin_id);

    if(sessions.usertype == "USER"){
        res.render("users/profile", {title: "Profile", user, success, error, sessions});
    }else if(sessions.usertype == "ADMIN"){
        res.render("admin/profile", {title: "Profile | Admin", success, error, admin, sessions});
    }else{
        res.redirect("/");
    }

    
};

const postSaveProfile = async (req, res)=>{

    const req_data = {
        user_id: req.body.user_id,
        name : req.body.name,
        username : req.body.username,
        email : req.body.email,
        phonenum : req.body.phonenum
    };

    let user = await AccountPromise.DBselectUser(req_data.user_id);

    if(user != ""){
        try {
            await AccountPromise.DBupdateUser(req_data);
            req.flash("success", "Your profile has been saved successfully!");
            res.redirect("/user/profile");
        } catch (error) {
            console.log(error);
            req.flash("error", "Failed to edit your profile.");
            res.redirect("/user/profile");
        }
    }else{
        res.redirect("/");
    }
    
};

const postSaveAdminProfile = async (req, res)=>{

    const req_data = {
        admin_id: req.body.admin_id,
        name : req.body.name,
        username : req.body.username,
        email : req.body.email,
        phonenum : req.body.phonenum
    };

    let user = await AccountPromise.DBselectAdmin(req_data.admin_id);

    if(user != ""){
        try {
            await AccountPromise.DBupdateAdmin(req_data);
            req.flash("success", "Your profile has been saved successfully!");
            res.redirect("/admin/profile");
        } catch (error) {
            console.log(error);
            req.flash("error", "Failed to edit your profile.");
            res.redirect("/admin/profile");
        }
    }else{
        res.redirect("/");
    }
    
};

// const postEditProduct = async (req, res)=>{

//     const req_data = {
//         prod_id: req.body.prod_id,
//         supplier_id : req.body.supplier_id,
//         prod_name : req.body.prod_name,
//         prod_price : req.body.prod_price,
//         prod_srp : req.body.prod_srp,
//         qty : req.body.qty,
//         imgpath : "",
//     };
//     let selected = await ProductPromise.DBselectProduct(req_data.prod_id); 

//     if(req.file){
//         //with image
//         req_data.imgpath = req.file.filename;
//         let imagepath = "./public/images/products/";
  
//         imagepath += selected[0].imgpath;

//         try {
//             await ProductPromise.DBupdateProduct(req_data);     
//             //unlink image
//             fs.unlink(imagepath, (err) => {
//             if (err) {
//                 console.error(err);
//             }else{
//                 console.log("image removed: "+imagepath);
//             }
//             //file removed
//             });
//             console.log("with image");
//             req.flash("success", "Products updated successfully.");
//             res.redirect("/admin/products");
//         } catch (error) {
//             req.flash("error", "Failed to update product.");
//             res.redirect("/admin/products");
//         }
//     }else{
//         //no image 
//         req_data.imgpath = selected[0].imgpath;

//         try {
//             await ProductPromise.DBupdateProduct(req_data);   
//             req.flash("success", "Product updated successfully.");
//             res.redirect("/admin/products");
//         } catch (error) {
//             console.log(error);
//             req.flash("error", "Failed to update product.");
//             res.redirect("/admin/products");
//         }
//     }

    
    
// };

// const postDeleteProduct = async (req, res)=>{

//     const prod_id = req.body.prod_id;

//     let imagepath = "./public/images/products/";
//     let selected = await ProductPromise.DBselectProduct(prod_id);   
//     imagepath += selected[0].imgpath;

//     try {
//         await ProductPromise.DBdeleteProduct(prod_id);  
//         fs.unlink(imagepath, (err) => {
//             if (err) {
//                 console.error(err);
//             }else{
//                 //file removed
//                 console.log("image removed: "+imagepath);
//             }
//         });
//         await req.flash("success", "Product deleted successfully.");
//         res.redirect("/admin/products");
//     } catch (error) {
//         await req.flash("error", "Failed to delete product.");
//         res.redirect("/admin/products");
//     }
   
    
// };


module.exports = {
    getProfile,
    postSaveProfile,
    postSaveAdminProfile
    // postEditProduct,
    // postDeleteProduct
};