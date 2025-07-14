import express from "express";
import { getProductById, getProductsList } from "../controllers/productController";

const router = express.Router();

// GET /products/:id
router.get("/", getProductsList);


// GET /products/:id
router.get("/:id", getProductById);

export default router;
