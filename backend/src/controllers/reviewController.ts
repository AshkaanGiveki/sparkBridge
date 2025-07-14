import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * GET /products/:id/reviews
 * Returns all reviews for a product
 */
export async function getReviewsByProduct(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const reviews = await prisma.review.findMany({
      where: { productId: id },
      orderBy: { createdAt: "desc" },
    });

    return res.json(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
}

/**
 * POST /products/:id/reviews
 * Create a new review for a product
 * Body should include: name, comment, rating (1-5)
 */
export async function postReview(req: Request, res: Response) {
  const { id } = req.params;
  const { name, comment, rating } = req.body;

  if (!name || !comment || typeof rating !== "number") {
    return res.status(400).json({ error: "Invalid review data." });
  }

  try {
    const newReview = await prisma.review.create({
      data: {
        productId: id,
        name,
        comment,
        rating,
      },
    });

    return res.status(201).json(newReview);
  } catch (error) {
    console.error("Error posting review:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
}
