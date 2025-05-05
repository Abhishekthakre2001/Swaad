const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const productRoutes = require("./routes/productRoutes");
const offerRoutes = require("./routes/offerRoutes");
const Productcategory = require("./routes/productcategory");
const orderRoutes = require("./routes/orderRoutes");
const Login = require('./routes/Login');
const path = require("path");
const http = require('http');
const { Server } = require('socket.io');
const cors = require("cors");

dotenv.config();

const app = express(); // ✅ only ONE express instance

const server = http.createServer(app); // ✅ create HTTP server

const io = new Server(server, {
  cors: {
    origin: "*", // Replace with frontend URL in production
  }
});

// ✅ Attach Socket.IO to app so it can be accessed in routes
app.set('io', io);

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

// Routes
app.use("/login", Login);
app.use("/api", productRoutes);
app.use("/offer", offerRoutes);
app.use("/productcategory", Productcategory);
app.use("/order", orderRoutes);
app.use("/images", express.static(path.join(__dirname, "images")));

// Start server
const PORT = process.env.PORT || 4021;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
