"use client";

import { useState } from "react";

export default function ReviewsForm({ productId }: { productId: string }) {
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!name.trim()) newErrors.name = "Name is required";
    if (!comment.trim()) newErrors.comment = "Comment is required";
    if (rating < 1 || rating > 5) newErrors.rating = "Rating must be 1-5";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${productId}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, rating, comment }),
      });

      if (!res.ok) {
        throw new Error("Failed to submit review");
      }

      setName("");
      setRating(5);
      setComment("");
      setErrors({});
      setSuccess(true);

      // Reload the page to show new review
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow">
      <h4 className="text-md font-semibold">Add a Review</h4>

      {success && (
        <p className="text-green-600 text-sm">Thank you! Your review was submitted.</p>
      )}

      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring ${
            errors.name ? "border-red-500 ring-red-300" : "border-gray-300 ring-rose-300"
          }`}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="rating">Rating</label>
        <select
          id="rating"
          className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring ${
            errors.rating ? "border-red-500 ring-red-300" : "border-gray-300 ring-rose-300"
          }`}
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
        >
          {[5, 4, 3, 2, 1].map((val) => (
            <option key={val} value={val}>
              {val} Star{val > 1 ? "s" : ""}
            </option>
          ))}
        </select>
        {errors.rating && <p className="text-red-500 text-xs mt-1">{errors.rating}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="comment">Comment</label>
        <textarea
          id="comment"
          rows={4}
          className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring ${
            errors.comment ? "border-red-500 ring-red-300" : "border-gray-300 ring-rose-300"
          }`}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        {errors.comment && <p className="text-red-500 text-xs mt-1">{errors.comment}</p>}
      </div>

      <button
        type="submit"
        className="bg-black hover:bg-blue-900 text-white font-semibold px-6 py-2 rounded transition"
      >
        Submit Review
      </button>
    </form>
  );
}
