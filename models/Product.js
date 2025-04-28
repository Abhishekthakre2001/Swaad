const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    title: { type: String, required: true },
    imageUrl: { type: String, required: true }, // Store image path
    description: { type: String },
    price: { type: Number, required: true },
    vegNonVegCategory: { type: String, enum: ["Veg", "Non-Veg"], required: true },
    productCategory: { type: String, required: true },
    email: { type: String, required: true } 
});

module.exports = mongoose.model("Product", ProductSchema);
