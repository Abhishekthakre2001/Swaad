const express = require("express");
const router = express.Router();
const { placeOrder, getAllOrders, updateOrderStatus } = require("../controllers/orderController");

// Route to place a new order
router.post("/orders", placeOrder);

// Route to get all orders
router.get("/orders", getAllOrders);

// Route to update order status
router.put("/orders/:id", updateOrderStatus);

module.exports = router;
