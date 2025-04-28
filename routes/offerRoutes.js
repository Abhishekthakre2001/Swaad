const express = require("express");
const router = express.Router();
const { createOffer, getAllOffers, deleteOffer } = require("../controllers/offerController");

// Route to create a new offer
router.post("/offers", createOffer);

// Route to get all offers
router.get("/offers", getAllOffers);

// Route to delete an offer by ID
router.delete("/offers/:id", deleteOffer);

module.exports = router;
