"use client";

import React, { useState } from "react";

interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date?: string;
}

export default function Reviews(Reviews:Review) {
  // Dummy initial reviews for demonstration
  const [reviews, setReviews] = useState<Review[]>([]);

  // Form state
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  // Validation errors
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!name.trim()) newErrors.name = "Name is required";
    if (!comment.trim()) newErrors.comment = "Comment is required";
    if (rating < 1 || rating > 5) newErrors.rating = "Rating must be 1-5";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const newReview: Review = {
      id: (Math.random() * 1000000).toFixed(0),
      name,
      rating,
      comment,
      date: new Date().toISOString().split("T")[0],
    };

    setReviews([newReview, ...reviews]);
    setName("");
    setRating(5);
    setComment("");
    setErrors({});
  };

  return (
    <section className="mt-0 max-w-3xl mx-auto">
      <h3 className="text-lg font-semibold mb-4">Customer Reviews</h3>

      {/* Review List */}
      <ul className="space-y-6 mb-8">
        {reviews.map(({ id, name, rating, comment, date }) => (
          <li key={id} className=" rounded-lg bg-white ">
            <div className="flex justify-between items-center mb-2">
              <p className="font-medium">{name}</p>
              <p className="text-yellow-500">
                {"★".repeat(rating) + "☆".repeat(5 - rating)}
              </p>
            </div>
            <p className="text-gray-700 font-light">{comment}</p>
            {date && <p className="text-xs text-gray-400 mt-1">{date}</p>}
          </li>
        ))}
      </ul>

      {/* Review Form */}
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow">
        <h4 className="text-md font-semibold">Add a Review</h4>

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
          className="bg-black cursor-pointer hover:bg-blue-900 text-white font-semibold px-6 py-2 rounded transition"
        >
          Submit Review
        </button>
      </form>
    </section>
  );
}
