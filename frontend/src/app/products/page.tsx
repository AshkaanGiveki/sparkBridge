// src/app/products/page.tsx

import ProductCard from "@/components/product/ProductCard";
import { Product } from "@/types/product";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3030";
console.log("✅ [AllProductsPage] BASE_URL:", BASE_URL);

export const metadata = {
  title: "Products | Sparkbridge Store",
  description: "Explore premium products at Sparkbridge.",
};

export default async function AllProductsPage() {
  console.log("📡 [AllProductsPage] Sending fetch request to:", `${BASE_URL}/api/products/`);

  let res: Response;
  try {
    res = await fetch(`${BASE_URL}/api/products/`, {
      cache: "no-store",
    });
  } catch (error) {
    console.error("🔥 [AllProductsPage] Fetch error:", error);
    throw new Error("Network error while fetching products.");
  }

  console.log("📡 [AllProductsPage] Response status:", res.status);

  if (!res.ok) {
    const errText = await res.text();
    console.error("❌ [AllProductsPage] Response not OK:", res.status, errText);
    throw new Error("Failed to load products.");
  }

  let products: Product[] = [];
  try {
    products = await res.json();
    console.log("📦 [AllProductsPage] Products fetched:", products);
  } catch (error) {
    console.error("🔥 [AllProductsPage] JSON parse error:", error);
    throw new Error("Failed to parse products.");
  }

  console.log("🧩 [AllProductsPage] Rendering with", products.length, "products");

  return (
    <main className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">All Products</h1>

      {products.length === 0 ? (
        <p className="text-muted-foreground">No products found.</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => {
            console.log("🪪 [AllProductsPage] Rendering product:", product.id, product.name);
            return <ProductCard key={product.id} product={product} />;
          })}
        </div>
      )}
    </main>
  );
}
