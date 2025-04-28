const express = require("express");
const router = express.Router();
const {
    createProductCategory,
    getAllProductCategories,
    deleteProductCategory
} = require("../controllers/productCategory");

// Route to create a new product category
router.post("/product-categories", createProductCategory);

// Route to get all product categories
router.get("/product-categories", getAllProductCategories);

// Route to delete a product category by ID
router.delete("/product-categories/:id", deleteProductCategory);

module.exports = router;
