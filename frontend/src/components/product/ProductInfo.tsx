"use client";

import React from "react";

interface ProductInfoProps {
  title: string;
  brand?: string;
  price: number;
  description: string;
  availability?: string;
  tags?: string[];
}

export default function ProductInfo({
  title,
  brand,
  price,
  description,
  availability,
  tags = [],
}: ProductInfoProps) {
  return (
    <section className="space-y-4">
      {/* Brand */}
      {brand && (
        <p className="text-sm text-gray-500">by {brand}</p>
      )}

      {/* Title */}
      <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">
        {title}
      </h1>

      {/* Price */}
      <p className="text-2xl text-rose-600 font-bold">
        ${price.toLocaleString()}
      </p>

      {/* Availability */}
      {availability && (
        <p className="text-green-600 text-sm font-medium">
          {availability}
        </p>
      )}

      {/* Description */}
      <p className="text-gray-700 leading-relaxed">
        {description}
      </p>

      {/* Tags */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </section>
  );
}
