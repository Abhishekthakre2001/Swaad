const Order = require("../models/Order");

// ✅ Place a new order
exports.placeOrder = async (req, res) => {
    console.log("request", req.body);
    try {
        const { tableNumber, items, totalBill, email } = req.body;

        if (!tableNumber || !items || items.length === 0 || !totalBill) {
            return res.status(400).json({ success: false, message: "Invalid order data" });
        }

        const newOrder = new Order({
            tableNumber,
            items,
            totalBill,
            status: "Undelivered",
            email
        });

        await newOrder.save();

        // ✅ Emit socket event after saving
        const io = req.app.get('io');
        io.emit('newOrder', newOrder);

        res.status(201).json({ success: true, data: newOrder });
    } catch (error) {
        console.log("error", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// ✅ Get all orders
exports.getAllOrders = async (req, res) => {
    try {
        const { email } = req.query;

        if (!email) {
            return res.status(400).json({ success: false, message: "Email is required" });
        }

        const orders = await Order.find({ email });
        res.status(200).json({ success: true, data: orders });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// ✅ Update order status
exports.updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!["Delivered", "Undelivered"].includes(status)) {
            return res.status(400).json({ success: false, message: "Invalid status" });
        }

        const updatedOrder = await Order.findByIdAndUpdate(id, { status }, { new: true });

        if (!updatedOrder) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        res.status(200).json({ success: true, data: updatedOrder });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
