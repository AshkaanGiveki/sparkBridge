export async function fetchAISummary(productId: string) {
    try {
      const res = await fetch(`${process.env.API_BASE_URL}/ai/summary`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
        cache: "no-store", // Always fresh summary
      });
      if (!res.ok) throw new Error("Failed to fetch AI summary");
      const data = await res.json();
      return data.summary;
    } catch (error) {
      console.error("Error fetching AI summary:", error);
      return "Summary unavailable";
    }
  }
  