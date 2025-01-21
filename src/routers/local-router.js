const express = require('express');

// Import controllers
const userController = require('../moduels/users/user-contoller');
const productController = require('../moduels/products/product-controller');

const router = express.Router();

// Attach controllers to their respective routes
router.use('/users', userController);
router.use('/products', productController);

// Export the router
module.exports = router;
