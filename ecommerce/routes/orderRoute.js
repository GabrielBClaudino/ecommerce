const express = require("express");
const router = express.Router();
const orderController = require("../controller/orderController.js");
const WithAuth = require('../middleware/auth.js');

router.get("/orders", orderController.getAllOrders);
router.get("/order/:id", orderController.getOrderById);
router.post("/order", orderController.createOrder);
router.delete("/order/:id", orderController.deleteOrder);
router.put("/order/:id", orderController.editOrder);

module.exports = router;