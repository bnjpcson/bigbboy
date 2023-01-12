const express = require('express')
const router = express.Router();
const homeController = require('../controllers/homeController.js');
const productsController = require('../controllers/productsController.js');
const contactController = require('../controllers/contactController.js');
const servicesController = require('../controllers/servicesController.js');
const loginController = require('../controllers/loginController.js');
const registerController = require('../controllers/registerController.js');



router.get("/", homeController.getHome);
router.get("/products", productsController.getProducts);
router.get("/contact", contactController.getContact);
router.get("/services", servicesController.getServices);
router.get("/login", loginController.getLogin);
router.get("/register", registerController.getRegister);

module.exports = router;
