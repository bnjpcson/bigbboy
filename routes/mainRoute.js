const express = require('express')
const router = express.Router();
const homeController = require('../controllers/homeController.js');
const contactController = require('../controllers/contactController.js');
const servicesController = require('../controllers/servicesController.js');
const loginController = require('../controllers/loginController.js');
const registerController = require('../controllers/registerController.js');
const adminController = require('../controllers/adminController.js');
const orderController = require('../controllers/orderController.js');
const transactionsController = require('../controllers/transactionsController.js');
const salesController = require('../controllers/salesController.js');
const accountController = require('../controllers/accountController.js');
const productController = require('../controllers/productController.js');
const suppliersController = require('../controllers/suppliersController.js');
const viewController = require('../controllers/viewController.js');
const cartController = require('../controllers/cartController.js');
const wishlistController = require('../controllers/wishlistController.js');
const profileController = require('../controllers/profileController.js');
const inventoryController = require('../controllers/inventoryController.js');






router.get("/", homeController.getHome);
router.get("/products", productController.getProducts);
router.get("/view-product/:prod_id", viewController.viewProduct);
router.post("/view-product/addtocart", viewController.postAddToCart);


router.get("/contact", contactController.getContact);
router.get("/services", servicesController.getServices);

router.get("/login", loginController.getLogin);
router.post("/login", loginController.postLogin);


router.get("/register", registerController.getRegister);
router.post("/register", registerController.postRegister);


//user routes
router.get("/user/cart", cartController.getCart);
router.get("/user/cart/:checkout", cartController.getCart);
router.post("/user/cart/checkout", cartController.postPlaceOrder);



router.get("/count-my-cart", cartController.getCountCart);
router.get("/get-sum", cartController.getSum);

router.get("/user/delete-item/:userOrders_id", cartController.getRemoveOrder);

router.put("/cart/update/:userOrders_id/:quantity", cartController.updateQuantity);


router.get("/user/orders", orderController.getOrder);
router.get("/user/orders/:op/:placedorder_id", orderController.getOrder);
router.get("/user/orders/:op/:placedorder_id", orderController.getOrder);


router.get("/user/wishlist", wishlistController.getWishList);
router.post("/user/wishlist", wishlistController.postWishList);
router.get("/user/wishlist/delete/:wishlist_id", wishlistController.deleteWishList);




router.get("/user/profile", profileController.getProfile);
router.post("/user/profile", profileController.postSaveProfile);






//admin routes
router.get("/admin/login", adminController.getAdminLogin);
router.post("/admin/login", adminController.postAdminLogin);

//dashboard
router.get("/admin", adminController.getAdmin);

//orders
router.get("/admin/orders", orderController.getOrder);
router.post("/admin/orders/complete", orderController.postOrder);


router.get("/admin/orders/:op/:placedorder_id", orderController.getOrder);


//transactions
router.get("/admin/transactions", transactionsController.getTransactions);

//sales report
router.get("/admin/sales", salesController.getSales);
router.get("/admin/sales/:op/:order_id", salesController.getSales);


//suppliers
router.get("/admin/suppliers", suppliersController.getSuppliers);
router.post("/admin/suppliers/add-supplier", suppliersController.postAddSupplier);
router.get("/admin/suppliers/:op/:id", suppliersController.getSuppliers);
router.post("/admin/suppliers/edit-supplier/", suppliersController.postEditSupplier);
router.post("/admin/suppliers/delete-supplier/", suppliersController.postDeleteSupplier);

//Products
router.get("/admin/products", productController.getProducts);
router.post("/admin/products/add-product", productController.uploadImage, productController.postAddProduct);
router.get("/admin/products/:op/:id", productController.getProducts);
router.post("/admin/products/edit-product/", productController.uploadImage, productController.postEditProduct);
router.post("/admin/products/delete-product/", productController.postDeleteProduct);
router.post("/admin/products/add-stock/", productController.postAddStock);



//manage accounts
router.get("/admin/accounts", accountController.getAccounts);
router.get("/admin/accounts/:op/:id", accountController.getAccounts);
router.post("/admin/edit-user/", accountController.postEditUser);
router.post("/admin/delete-user/", accountController.postDeleteUser);
router.post("/admin/edit-admin/", accountController.postEditAdmin);
router.post("/admin/delete-admin/", accountController.postDeleteAdmin);
router.post("/admin/add-user", accountController.postAddUser);
router.post("/admin/add-admin", accountController.postAddAdmin);

router.get("/admin/profile", profileController.getProfile);
router.post("/admin/profile", profileController.postSaveAdminProfile);

router.get("/admin/wishlist", wishlistController.getWishList);
router.get("/admin/inventory-log", inventoryController.getActivityLog);



// router.get("/admin/homepage", pageController.getHomePage);




router.get("/logout", (req, res)=>{
    req.session.destroy();
    console.log(req.session , "User logged out!");
    res.redirect("/");
});

module.exports = router;
