const Offer = require("../models/Offer");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

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

// Create a new offer
exports.createOffer = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ success: false, message: err.message });
        }

        try {
            const { name, email } = req.body;

            // Ensure image is uploaded
            if (!req.file) {
                return res.status(400).json({ success: false, message: "Image is required" });
            }

            const offer = new Offer({
                name,
                imageUrl: `/images/${req.file.filename}`,
                email 
            });

            await offer.save();
            res.status(201).json({ success: true, data: offer });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    });
};

// Get all offers
exports.getAllOffers = async (req, res) => {
    try {
      const { email } = req.query; // 🛑 get email from query
  
      if (!email) {
        return res.status(400).json({ success: false, message: "Email is required" });
      }
  
      const offers = await Offer.find({ email }); // 🛑 find offers where email matches
      res.status(200).json({ success: true, data: offers });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };
  

// Delete an offer by ID
exports.deleteOffer = async (req, res) => {
    console.log("first")
    try {
        const offer = await Offer.findById(req.params.id);
        if (!offer) {
            return res.status(404).json({ success: false, message: "Offer not found" });
        }

        // Delete offer image from server
        const imagePath = path.join(__dirname, "../", offer.imageUrl);
        if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
        }

        // Delete offer from database
        await Offer.findByIdAndDelete(req.params.id);

        res.status(200).json({ success: true, message: "Offer deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
