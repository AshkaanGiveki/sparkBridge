import express from "express";
import { generateProductSummary } from "../controllers/aiController";

const router = express.Router();

// POST /ai/summary
router.post("/summary", generateProductSummary);

export default router;
