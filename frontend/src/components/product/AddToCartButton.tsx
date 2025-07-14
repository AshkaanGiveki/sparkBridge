"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import trashIcon from "../../assets/images/bin.png";
import likeIcon from "../../assets/images/like.png";
import likedIcon from "../../assets/images/liked.png";

interface AddToCartButtonProps {
    productId: string;
}

export default function AddToCartButton({ productId }: AddToCartButtonProps) {
    const [quantity, setQuantity] = useState(0);
    const [liked, setLiked] = useState(false);

    // Load liked state from localStorage on mount
    useEffect(() => {
        const storedLikes = localStorage.getItem("likedProducts");
        if (storedLikes) {
            const likedProducts = JSON.parse(storedLikes) as Record<string, boolean>;
            if (likedProducts[productId]) setLiked(true);
        }
    }, [productId]);

    // Save liked state to localStorage whenever it changes
    useEffect(() => {
        const storedLikes = localStorage.getItem("likedProducts");
        const likedProducts = storedLikes ? JSON.parse(storedLikes) : {};
        likedProducts[productId] = liked;
        localStorage.setItem("likedProducts", JSON.stringify(likedProducts));
    }, [liked, productId]);

    const handleAddToCart = () => setQuantity(1);
    const handleIncrement = () => {
        if (quantity < 3) setQuantity((prev) => prev + 1);
    };
    const handleDecrement = () => {
        if (quantity === 1) setQuantity(0);
        else setQuantity((prev) => prev - 1);
    };

    const toggleLiked = () => setLiked((prev) => !prev);

    return (
        <div className="flex w-full items-center gap-4">
            {/* Add to Cart / Quantity */}
            <div className="flex w-full justify-end items-center gap-2">
                {quantity === 0 ? (
                    <button
                        onClick={handleAddToCart}
                        className="w-full max-sm:w-[70%] sm:w-full bg-black text-white text-base sm:text-lg font-semibold 
               py-3 px-6 rounded-lg cursor-pointer hover:bg-gray-800 transition-colors duration-200"
                    >
                        Add to Cart
                    </button>
                ) : (
                    <div className="flex w-full max-sm:w-[80%] items-center gap-2 border border-gray-300 justify-around rounded-lg px-4 py-2">
                        <button
                            onClick={handleDecrement}
                            className="text-gray-700 cursor-pointer text-2xl w-8 h-8 flex items-center justify-center hover:text-red-500"
                        >
                            {quantity === 1 ? (
                                <Image
                                    src={trashIcon}
                                    alt="Remove"
                                    width={20}
                                    height={20}
                                    className="hover:opacity-80 cursor-pointer"
                                />
                            ) : (
                                "−"
                            )}
                        </button>

                        <span className="text-lg font-medium w-6 text-center">{quantity}</span>

                        <button
                            onClick={handleIncrement}
                            className={`text-gray-700 text-2xl cursor-pointer w-8 h-8 flex items-center justify-center ${quantity === 3 ? "opacity-30 cursor-not-allowed" : "hover:text-green-600"
                                }`}
                            disabled={quantity === 3}
                        >
                            +
                        </button>
                    </div>
                )}

            </div>

            {/* Favorite Button */}
            <button
                onClick={toggleLiked}
                className="p-3 border cursor-pointer border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                aria-label="Toggle Favorite"
            >
                <Image
                    src={liked ? likedIcon : likeIcon}
                    alt={liked ? "Liked" : "Like"}
                    width={24}
                    height={24}
                />
            </button>
        </div>
    );
}
