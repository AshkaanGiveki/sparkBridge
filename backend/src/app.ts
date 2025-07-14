import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import productRoutes from "./routes/productRoutes";
import reviewRoutes from "./routes/reviewRoutes";
import aiRoutes from "./routes/aiRoutes";
import path from "path";


dotenv.config();

const app = express();

// Enable CORS with default settings (allow all origins)
// You can restrict origin in production for security
app.use(cors());

// Parse incoming JSON requests
app.use(express.json());

// Serve images from /assets/images
app.use("/assets/images", express.static(path.join(__dirname, "../assets/images")));

// Register routes
app.use("/api/products", productRoutes); // handles /products/:id and nested reviews routes
app.use("/api/products", reviewRoutes);  // for /products/:id/reviews endpoints
app.use("/api/ai", aiRoutes);             // AI summary endpoint

// Basic root health check route
app.get("/", (req, res) => {
  res.status(200).json({ message: "Backend API is running" });
});

export default app;
