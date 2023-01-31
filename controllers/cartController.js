const ProductPromise = require('../promises/Product.js');
const UserOrderPromise = require('../promises/UserOrder.js');


const viewProduct = async (req, res)=>{

    const prod_id = req.params.prod_id;
    
    let data = await ProductPromise.DBselectProduct(prod_id);

    const success = req.flash("success");
    const error = req.flash("error");
    
    let sessions = {
        user_id : req.session.user_id,
        admin_id : req.session.admin_id,
        name : req.session.name,
        username : req.session.username,
        usertype: req.session.usertype,
        email : req.session.email,
    };
    
    if(data != ""){
        if(sessions.usertype == "USER"){
            res.render("users/view-one", {title: data[0].prod_name, sessions, success, error, data});
        }else if(sessions.usertype == "ADMIN"){
            res.redirect("/");
        }else{
            res.render("view-one", {title: data[0].prod_name, sessions, success, error, data});
        }
    }else{
        res.redirect("/");
    }

    
};

const postAddToCart = async (req, res)=>{

    const req_data = {
        user_id : req.body.user_id,
        prod_id : req.body.prod_id,
        qty : req.body.qty,
        totalprice : 1
    };

    let product = await ProductPromise.DBselectProduct(req_data.prod_id);   
    if(product != ""){
        req_data.totalprice = req_data.qty * product[0].prod_srp;
        try {
            await UserOrderPromise.DBaddUserOrder(req_data);   
            req.flash("success", "Your order was added successfully!");
            res.redirect("/view-product/"+req_data.prod_id);
        } catch (error) {
            console.log(error);
            await req.flash("error", "Failed to add your order.");
            res.redirect("/view-product/"+req_data.prod_id);
        }

    }else{
        await req.flash("error", "ID not found!");
        res.redirect("/view-product/"+req_data.prod_id);
    }


    // try {
    //     await ProductPromise.DBaddProduct(req_data);   
    //     await req.flash("success", "Product inserted successfully.");
    //     res.redirect("/admin/products");

    // } catch (error) {
    //     console.log(error);
    //     await req.flash("error", "Failed to insert product.");
    //     res.redirect("/admin/products");
    // }
};

const postEditProduct = async (req, res)=>{

    const req_data = {
        prod_id: req.body.prod_id,
        supplier_id : req.body.supplier_id,
        prod_name : req.body.prod_name,
        prod_price : req.body.prod_price,
        prod_srp : req.body.prod_srp,
        qty : req.body.qty,
        imgpath : "",
    };
    let selected = await ProductPromise.DBselectProduct(req_data.prod_id); 

    if(req.file){
        //with image
        req_data.imgpath = req.file.filename;
        let imagepath = "./public/images/products/";
  
        imagepath += selected[0].imgpath;

        try {
            await ProductPromise.DBupdateProduct(req_data);     
            //unlink image
            fs.unlink(imagepath, (err) => {
            if (err) {
                console.error(err);
            }else{
                console.log("image removed: "+imagepath);
            }
            //file removed
            });
            console.log("with image");
            req.flash("success", "Products updated successfully.");
            res.redirect("/admin/products");
        } catch (error) {
            req.flash("error", "Failed to update product.");
            res.redirect("/admin/products");
        }
    }else{
        //no image 
        req_data.imgpath = selected[0].imgpath;

        try {
            await ProductPromise.DBupdateProduct(req_data);   
            req.flash("success", "Product updated successfully.");
            res.redirect("/admin/products");
        } catch (error) {
            console.log(error);
            req.flash("error", "Failed to update product.");
            res.redirect("/admin/products");
        }
    }

    
    
};

const postDeleteProduct = async (req, res)=>{

    const prod_id = req.body.prod_id;

    let imagepath = "./public/images/products/";
    let selected = await ProductPromise.DBselectProduct(prod_id);   
    imagepath += selected[0].imgpath;

    try {
        await ProductPromise.DBdeleteProduct(prod_id);  
        fs.unlink(imagepath, (err) => {
            if (err) {
                console.error(err);
            }else{
                //file removed
                console.log("image removed: "+imagepath);
            }
        });
        await req.flash("success", "Product deleted successfully.");
        res.redirect("/admin/products");
    } catch (error) {
        await req.flash("error", "Failed to delete product.");
        res.redirect("/admin/products");
    }
   
    
};


const getCart = async (req, res) =>{
    res.render("users/mycart", {title: "My Cart"});
}

module.exports = {
    viewProduct,
    postAddToCart,
    postEditProduct,
    postDeleteProduct,
    getCart
};