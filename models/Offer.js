const mongoose = require("mongoose");

const OfferSchema = new mongoose.Schema({
    name: { type: String, required: true }, // Offer title
    imageUrl: { type: String, required: true }, // Image path
    email: { type: String, required: true }
});

module.exports = mongoose.model("Offer", OfferSchema);
