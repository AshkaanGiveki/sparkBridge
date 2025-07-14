// src/app/products/page.tsx

import ProductCard from "@/components/product/ProductCard";
import { Product } from "@/types/product";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3030";


export const metadata = {
    title: "Products | Sparkbridge Store",
    description: "Explore premium products at Sparkbridge.",
  };
  
export default async function AllProductsPage() {
    const res = await fetch(`${BASE_URL}/api/products/`, {
        cache: "no-store",
    });

    if (!res.ok) {
        const errText = await res.text();
        console.error("Response was not OK:", res.status, errText);
        throw new Error("Failed to load products.");
    }

    const products: Product[] = await res.json();

    return (
        <main className="max-w-7xl mx-auto px-4 py-10">
            <h1 className="text-2xl font-bold mb-6">All Products</h1>

            {products.length === 0 ? (
                <p className="text-muted-foreground">No products found.</p>
            ) : (
                <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </main>
    );
}
