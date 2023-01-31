const SupplierPromise = require('../promises/Supplier.js');

const getSuppliers = async (req, res)=>{

    const id = req.params.id;
    const op = req.params.op;
    
    let data = await SupplierPromise.DBgetSuppliers();

    let selected = "";
    let selectedDel = "";
    if(id != "" && op == "edit-supplier"){
        selected = await SupplierPromise.DBselectSupplier(id);
    }
    if(id != "" && op == "delete-supplier"){
        selectedDel = await SupplierPromise.DBselectSupplier(id);
    }

   

    const success = req.flash("success");
    const error = req.flash("error");

    let sessions = {
        id : req.session.id,
        name : req.session.name,
        username : req.session.username,
        usertype: req.session.usertype,
        email : req.session.email,
    };

    if(sessions.usertype == "USER"){
        res.redirect("/");
    }else if(sessions.usertype == "ADMIN"){
        res.render("admin/suppliers", {title: "Suppliers | Admin", sessions, success, error, data, selected, selectedDel});
    }else{
        res.redirect("/admin/login");
    }
    
};

const postAddSupplier = async (req, res)=>{

    const req_data = {
        supplier_name : req.body.supplier_name
    };

    try {
        await SupplierPromise.DBaddSupplier(req_data.supplier_name);   
        await req.flash("success", "Supplier inserted successfully.");
        res.redirect("/admin/suppliers");

    } catch (error) {
        await req.flash("error", "Failed to insert supplier.");
        res.redirect("/admin/suppliers");
    }
}

const postEditSupplier = async (req, res)=>{

    const req_data = {
        supplier_id : req.body.supplier_id,
        supplier_name : req.body.supplier_name
    };

    try {
        await SupplierPromise.DBupdateSupplier(req_data);   
        req.flash("success", "Supplier updated successfully.");
        res.redirect("/admin/suppliers");
    } catch (error) {
        req.flash("error", "Failed to update supplier.");
        res.redirect("/admin/suppliers");
    }
    
};

const postDeleteSupplier = async (req, res)=>{

    const supplier_id = req.body.supplier_id;

    try {
        await SupplierPromise.DBdeleteSupplier(supplier_id);   
        await req.flash("success", "Supplier deleted successfully.");
        res.redirect("/admin/suppliers");
    } catch (error) {
        await req.flash("error", "Failed to delete supplier.");
        res.redirect("/admin/suppliers");
    }
   
    
};

module.exports = {
    getSuppliers,
    postAddSupplier,
    postEditSupplier,
    postDeleteSupplier
}