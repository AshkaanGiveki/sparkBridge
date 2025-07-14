"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var dotenv_1 = __importDefault(require("dotenv"));
var productRoutes_1 = __importDefault(require("./routes/productRoutes"));
var reviewRoutes_1 = __importDefault(require("./routes/reviewRoutes"));
var aiRoutes_1 = __importDefault(require("./routes/aiRoutes"));
var path_1 = __importDefault(require("path"));
dotenv_1.default.config();
var app = (0, express_1.default)();
// Enable CORS with default settings (allow all origins)
// You can restrict origin in production for security
app.use((0, cors_1.default)());
// Parse incoming JSON requests
app.use(express_1.default.json());
// Serve images from /assets/images
app.use("/assets/images", express_1.default.static(path_1.default.join(__dirname, "../assets/images")));
// Register routes
app.use("/api/products", productRoutes_1.default); // handles /products/:id and nested reviews routes
app.use("/api/products", reviewRoutes_1.default); // for /products/:id/reviews endpoints
app.use("/api/ai", aiRoutes_1.default); // AI summary endpoint
// Basic root health check route
app.get("/", function (req, res) {
    res.status(200).json({ message: "Backend API is running" });
});
exports.default = app;
