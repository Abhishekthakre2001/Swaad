const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    tableNumber: { type: Number, required: true }, // Table number
    items: [
        {
            name: { type: String, required: true },
            price: { type: Number, required: true },
            image: { type: String, required: true },
            category: { type: String, required: true },
            description: { type: String },
            quantity: { type: Number, required: true, default: 1 },
        }
    ],
    totalBill: { type: Number, required: true }, // Total order amount
    status: { type: String, enum: ["Undelivered", "Delivered"], default: "Undelivered" }, 
    email: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model("Order", OrderSchema);
