const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');
const { verifyToken } = require('../middleware/authMiddleware'); // Import specific middleware
const { isAdmin } = require('../middleware/adminMiddleware'); // Import specific middleware

// Recommendations route callback must be defined!
router.get('/:customerId/recommendations', verifyToken, customerController.getRecommendations);
router.get('/:customerId/orders', verifyToken, customerController.getOrdersByCustomerId);

router.get('/', verifyToken, isAdmin, customerController.getAllCustomers);
router.get('/:customerId', verifyToken, customerController.getCustomerById);
router.post('/', verifyToken, isAdmin, customerController.createCustomer);
router.put('/:customerId', verifyToken, customerController.updateCustomer);
router.delete('/:customerId', verifyToken, isAdmin, customerController.deleteCustomer);

module.exports = router;
