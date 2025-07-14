import express from "express";
import { getReviewsByProduct, postReview } from "../controllers/reviewController";

const router = express.Router({ mergeParams: true });

// GET /products/:id/reviews
router.get("/:id/reviews", getReviewsByProduct);

// POST /products/:id/reviews
router.post("/:id/reviews", postReview);

export default router;
