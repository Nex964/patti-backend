const express = require('express');
const auth = require('../../middlewares/auth');
const orderController = require('../../controllers/order.controller');

const router = express.Router();

router
  .route('/')
  .get(orderController.createOrder);

router
  .route('/success')
  .get(orderController.onSuccess);

module.exports = router;
