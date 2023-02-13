const dbcon = require('../db/conn.js');
const ProductPromise = require('../promises/Product.js');
const SupplierPromise = require('../promises/Supplier.js');
const InventoryPromise = require('../promises/Inventory.js');

const multer = require('multer');
const path = require('path');
const fs = require('fs');
const storage = multer.diskStorage(
    {
        destination: (req, file, cb) => {
            cb(null, './public/images/products');
        },
        filename: (req, file, cb) => {
            cb(null, path.parse(file.originalname).name+"_"+Date.now() + path.extname(file.originalname));
        }
    }
);

const storageMulter = multer({storage: storage});

const uploadImage = storageMulter.single('image');

const getProducts = async (req, res)=>{
 
    const id = req.params.id;
    const op = req.params.op;
    
    let data = await ProductPromise.DBgetProducts();
    let suppliers = await SupplierPromise.DBgetSuppliers();


    let selected = "";
    let selectedDel = "";
    let selectedQuantity = "";

    if(id != "" && op == "edit-product"){
        selected = await ProductPromise.DBselectProduct(id);
    }
    if(id != "" && op == "delete-product"){
        selectedDel = await ProductPromise.DBselectProduct(id);
    }
    if(id != "" && op == "add-stock"){
        selectedQuantity = await ProductPromise.DBselectProduct(id);
    }

   

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

    if(sessions.usertype == "USER"){
        res.render("users/products", {title: "Products", sessions, success, error, data, suppliers, selected, selectedDel});
    }else if(sessions.usertype == "ADMIN"){
        res.render("admin/products", {title: "Products | Admin", sessions, success, error, data, suppliers, selected, selectedDel, selectedQuantity});
    }else{
        res.render("products", {title: "Products", sessions, success, error, data, suppliers, selected, selectedDel});
    }
};

const postAddProduct = async (req, res)=>{

    const req_data = {
        supplier_id : req.body.supplier_id,
        prod_name : req.body.prod_name,
        prod_desc : req.body.prod_desc,
        prod_price : req.body.prod_price,
        prod_srp : req.body.prod_srp,
        qty : req.body.qty,
        imgpath : req.file.filename,
    };

    try {
        await ProductPromise.DBaddProduct(req_data);   
        await req.flash("success", "Product inserted successfully.");
        res.redirect("/admin/products");

    } catch (error) {
        console.log(error);
        await req.flash("error", "Failed to insert product.");
        res.redirect("/admin/products");
    }
};

const postEditProduct = async (req, res)=>{

    const req_data = {
        prod_id: req.body.prod_id,
        supplier_id : req.body.supplier_id,
        prod_name : req.body.prod_name,
        prod_desc : req.body.prod_desc,
        prod_price : req.body.prod_price,
        prod_srp : req.body.prod_srp,
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

const postAddStock = async (req, res)=>{

    const prod_id = req.body.prod_id;
    const admin_id = req.session.admin_id;
    const qty_after = req.body.qty_after;
    const qty_before = req.body.qty_before;


    try {
        await InventoryPromise.DBinsertInventoryLog(prod_id, admin_id, qty_before, qty_after);  
        await ProductPromise.DBupdateQuantity(prod_id, qty_after);  
        req.flash("success", "Product's quantity saved successfully.");
        res.redirect("/admin/products");
    } catch (error) {
        req.flash("error", "Failed to edit quantity.");
        console.log(error);
        res.redirect("/admin/products");
    }
   
    
};

const getProductDetails = async (req, res)=>{

    let prod_id = req.params.prod_id;
    let products = await await ProductPromise.DBselectProduct(prod_id);
    
    res.json(products);
    res.end();
};


module.exports = {
    getProducts,
    uploadImage,
    postAddProduct,
    postEditProduct,
    postDeleteProduct,
    postAddStock,
    getProductDetails
};