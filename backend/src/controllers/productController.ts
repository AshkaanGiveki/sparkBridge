import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getProductById(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const product = await prisma.product.findUnique({
        where: { id },
        include: {
          brand: true,
          category: {
            include: {
              options: {
                include: {
                  values: {
                    include: {
                      color: true, // get hexCode here
                    },
                  },
                },
              },
            },
          },
          selectedOptions: {
            include: {
              value: {
                include: {
                  option: true,
                  color: true, // include color here as well
                },
              },
            },
          },
          reviews: {
            orderBy: { createdAt: "desc" },
          },
          images: true,
        },
      });
      

    if (!product) {
      return res.status(404).json({ error: "Product not found." });
    }

    return res.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
}

/**
 * GET /products
 * Fetch all products (summary list)
 */
export async function getProductsList(req: Request, res: Response) {
    try {
      const products = await prisma.product.findMany({
        orderBy: { createdAt: "desc" },
        include: {
          brand: true,
          images: true, // assuming you store image URLs in a separate table
        },
      });
  
      return res.json(products);
    } catch (error) {
        
      console.error("Error fetching products list:", error);
      return res.status(500).json({ error: "Internal server error." });
    }
  }
  