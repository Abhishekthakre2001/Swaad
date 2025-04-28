const Product = require("../models/Product");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Configure storage for images
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images/"); // Save images in 'images' folder
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    }
});

// File upload middleware
const upload = multer({ storage: storage }).single("image");

// Create a new product
exports.createProduct = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ success: false, message: err.message });
        }

        try {
            const { title, description, price, vegNonVegCategory, productCategory, email  } = req.body;

            // Ensure image is uploaded
            if (!req.file) {
                return res.status(400).json({ success: false, message: "Image is required" });
            }

            // Convert enum value to match the schema (Veg or Non-Veg)
            const categoryValue = vegNonVegCategory.toLowerCase() === "veg" ? "Veg" : "Non-Veg";

            const product = new Product({
                title,
                imageUrl: `/images/${req.file.filename}`, // Save correct image path
                description,
                price,
                vegNonVegCategory: categoryValue, // Fix enum issue
                productCategory,
                email
            });

            await product.save();
            res.status(201).json({ success: true, data: product });

        } catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    });
};


// Get all products
exports.getAllProducts = async (req, res) => {
    try {
        const { email } = req.query; // ✅ get email from query params

        if (!email) {
            return res.status(400).json({ success: false, message: "Email is required" });
        }

        const products = await Product.find({ email }); // ✅ find products with matching email
        res.status(200).json({ success: true, data: products });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


// Delete product by ID
exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        // Delete image from server
        const imagePath = path.join(__dirname, "../", product.imageUrl);
        if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
        }

        // Delete product from database
        await Product.findByIdAndDelete(req.params.id);

        res.status(200).json({ success: true, message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};