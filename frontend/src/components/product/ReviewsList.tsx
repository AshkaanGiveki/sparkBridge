// components/product/ReviewsList.tsx
export default async function ReviewsList({ productId }: { productId: string }) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${productId}/reviews`, {
      cache: "no-store",
    });
  
    if (!res.ok) {
      return <p className="text-sm text-gray-500">Failed to load reviews.</p>;
    }
  
    const reviews = await res.json();
  
    if (!reviews || !Array.isArray(reviews)) {
      return <p className="text-sm text-gray-500">No reviews available.</p>;
    }
  
    return (
      <ul className="space-y-6 mb-8">
        {reviews.map((review: any) => (
          <li key={review.id} className="rounded-lg px-4 bg-white">
            <div className="flex justify-between items-center mb-2">
              <p className="font-medium">{review.name}</p>

              <p className="text-yellow-500">
                {"★".repeat(review.rating) + "☆".repeat(5 - review.rating)}
              </p>
            </div>
            <p className="text-gray-700 font-light">{review.comment}</p>
            {review.date && (
              <p className="text-xs text-gray-400 mt-1">
                {new Date(review.date).toLocaleDateString()}
              </p>
            )}
          </li>
        ))}
      </ul>
    );
  }
  