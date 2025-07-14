export async function getProductById(id: string) {
    try {
      const res = await fetch(`${process.env.API_BASE_URL}/products/${id}`, {
        next: { revalidate: 60 }, // Revalidate cache every 60s (ISR)
      });
      if (!res.ok) throw new Error("Failed to fetch product");
      return await res.json();
    } catch (error) {
      console.error("Error fetching product:", error);
      return null;
    }
  }
  