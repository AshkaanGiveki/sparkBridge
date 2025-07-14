"use client";

import { useEffect, useState } from "react";
import AIAssistant from "./AIAssistant";

interface AIAssistantClientProps {
  productId: string;
  name: string;
  description: string;
  reviews?: { id: string; text: string; rating: number }[];
}

export default function AIAssistantClient({
  productId,
  name,
  description,
  reviews,
}: AIAssistantClientProps) {
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await fetch("http://localhost:3030/api/ai/summary", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ productId, name, description, reviews: reviews?.map(r => r.text) || [] }),
        });

        const data = await res.json();
        setSummary(data.summary || "No summary available.");
      } catch (error) {
        setSummary("Failed to generate AI summary.");
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, [productId, name, description, reviews]);

  return <AIAssistant summaryText={summary} loading={loading} />;
}
