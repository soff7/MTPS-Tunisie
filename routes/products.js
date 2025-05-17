const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const productsController = require('../controllers/productsController');

// Public routes
router.get('/', productsController.getProducts);
router.get('/:id', productsController.getProductById);

// Protected routes (require authentication)
router.post('/', auth, productsController.createProduct);
router.patch('/:id', auth, productsController.updateProduct);
router.delete('/:id', auth, productsController.deleteProduct);

// Test route
router.get('/test/api', productsController.testRoute);

module.exports = router;
