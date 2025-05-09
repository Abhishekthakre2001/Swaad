const mongoose = require("mongoose");

const ProductCategorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    imageUrl: { type: String, required: true },
    email: { type: String, required: true } 
});

module.exports = mongoose.model("ProductCategory", ProductCategorySchema);
