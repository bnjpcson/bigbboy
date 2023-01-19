const express = require('express')
const router = express.Router();
const homeController = require('../controllers/homeController.js');
const productsController = require('../controllers/productsController.js');
const contactController = require('../controllers/contactController.js');
const servicesController = require('../controllers/servicesController.js');
const loginController = require('../controllers/loginController.js');
const registerController = require('../controllers/registerController.js');
const adminController = require('../controllers/adminController.js');
const orderController = require('../controllers/orderController.js');
const transactionsController = require('../controllers/transactionsController.js');
const salesController = require('../controllers/salesController.js');
const accountController = require('../controllers/accountController.js');
const itemController = require('../controllers/itemController.js');
const pageController = require('../controllers/pageController.js');








router.get("/", homeController.getHome);
router.get("/products", productsController.getProducts);
router.get("/contact", contactController.getContact);
router.get("/services", servicesController.getServices);

router.get("/login", loginController.getLogin);
router.post("/login", loginController.postLogin);


router.get("/register", registerController.getRegister);
router.post("/register", registerController.postRegister);

router.get("/admin/login", adminController.getAdminLogin);
router.post("/admin/login", adminController.postAdminLogin);


router.get("/admin", adminController.getAdmin);

router.get("/admin/orders", orderController.getOrder);

router.get("/admin/transactions", transactionsController.getTransactions);
router.get("/admin/sales", salesController.getSales);
router.get("/admin/accounts", accountController.getAccounts);
router.get("/admin/accounts-user", accountController.getAccountsUser);

router.get("/admin/items", itemController.getItem);
router.get("/admin/homepage", pageController.getHomePage);




router.get("/logout", (req, res)=>{
    req.session.destroy();
    console.log(req.session , "User logged out!");
    res.redirect("/");
});

module.exports = router;
