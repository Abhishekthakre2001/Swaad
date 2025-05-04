const ProductCategory = require("../models/ProductCategory");
const multer = require("multer");
const path = require("path");

// Configure Multer storage
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

// Create a new product category
exports.createProductCategory = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ success: false, message: err.message });
        }

        try {
            const { name, email  } = req.body;

            // Ensure image is uploaded
            if (!req.file) {
                return res.status(400).json({ success: false, message: "Image is required" });
            }

            const productCategory = new ProductCategory({
                name,
                imageUrl: `/images/${req.file.filename}`,
                email
            });

            await productCategory.save();
            res.status(201).json({ success: true, data: productCategory });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    });
};

// Get all product categories
exports.getAllProductCategories = async (req, res) => {
    try {
      const { email } = req.query; // 🛑 get email from query
  
      if (!email) {
        return res.status(400).json({ success: false, message: "Email is required" });
      }
  
      const categories = await ProductCategory.find({ email }); // 🛑 find categories for that email
      res.status(200).json({ success: true, data: categories });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };
  

// Delete a product category by ID
exports.deleteProductCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await ProductCategory.findById(id);

        if (!category) {
            return res.status(404).json({ success: false, message: "Category not found" });
        }

        await ProductCategory.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Category deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
