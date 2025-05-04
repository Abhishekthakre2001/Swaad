const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const productRoutes = require("./routes/productRoutes");
const offerRoutes = require("./routes/offerRoutes");
const Productcategory = require("./routes/productcategory");
const orderRoutes = require("./routes/orderRoutes");
const Login = require('./routes/Login')
const path = require("path");
const cors = require("cors"); 

dotenv.config();
const app = express();
app.use(bodyParser.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("MongoDB connected"))

  .catch(err => console.log(err));

app.use("/login", Login);
app.use("/api", productRoutes);
app.use("/offer", offerRoutes);
app.use("/productcategory", Productcategory);
app.use("/order", orderRoutes);
app.use("/images", express.static(path.join(__dirname, "images")));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
