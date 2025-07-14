"use client";

import { useState } from "react";
import Image from "next/image";

interface ProductGalleryProps {
  images: {
    id: string;
    imageName: string;
    productId: string;
  }[];
}

export default function ProductGallery({ images }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isFullscreenOpen, setIsFullscreenOpen] = useState(false);

  const hasImages = images.length > 0;
  const selectedImage = hasImages
    ? `${process.env.NEXT_PUBLIC_API_URL}/assets/images/${images[selectedIndex].imageName}`
    : "/placeholder.jpg";

  const visibleThumbnails = images.slice(0, 6);
  const hasMore = images.length > 6;

  const handleOpenFullscreen = (index: number) => {
    setSelectedIndex(index);
    setIsFullscreenOpen(true);
  };

  const handleCloseFullscreen = (e: React.MouseEvent<HTMLDivElement>) => {
    // Only close if the background itself is clicked (not child content)
    if (e.target === e.currentTarget) {
      setIsFullscreenOpen(false);
    }
  };

  return (
    <>
      {/* Gallery layout */}
      <div className="w-full flex flex-col-reverse md:flex-row gap-4">
        {/* Thumbnails */}
        <div className="flex md:flex-col gap-0">
          {visibleThumbnails.map((image, index) => {
            const isLastVisible = hasMore && index === 5;
            return (
              <div key={image.id} className="w-18 h-18 p-[5px] box-content">
                <button
                  onClick={() =>
                    isLastVisible
                      ? handleOpenFullscreen(index)
                      : setSelectedIndex(index)
                  }
                  className={`w-full h-full relative border cursor-pointer border-[#eee] rounded-md overflow-hidden focus:outline-none transition-all flex items-center justify-center ${
                    index === selectedIndex
                      ? "ring-1 ring-black-10"
                      : "opacity-50 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={`${process.env.NEXT_PUBLIC_API_URL}/assets/images/${image.imageName}`}
                    alt={`Thumbnail ${index + 1}`}
                    width={60}
                    height={60}
                    className="object-contain max-w-full max-h-full"
                  />
                  {isLastVisible && (
                    <div className="absolute inset-0 back flex items-center justify-center bg-white/90">
                      <span className="text-black text-xl font-bold">⋯</span>
                    </div>
                  )}
                </button>
              </div>
            );
          })}
        </div>

        {/* Main Image */}
        <div
          className="flex-1 border border-[#eee] overflow-hidden p-[20px] cursor-pointer"
          onClick={() => handleOpenFullscreen(selectedIndex)}
        >
          <Image
            src={selectedImage}
            alt="Selected Product Image"
            width={600}
            height={600}
            className="object-contain w-full h-auto max-h-[500px] mx-auto"
            priority
          />
        </div>
      </div>

      {/* Fullscreen Viewer */}
      {isFullscreenOpen && (
        <div
          onClick={handleCloseFullscreen}
          className="fixed inset-0 z-50 bg-black/95  flex flex-col justify-center items-center mb-0"
        >
          {/* Close button */}
          <div
            className="absolute top-4 right-4 text-white text-3xl cursor-pointer z-10"
            onClick={() => setIsFullscreenOpen(false)}
          >
            ×
          </div>

          {/* Fullscreen content */}
          <div className="w-full flex flex-col items-center justify-center px-4" onClick={handleCloseFullscreen}>
            {/* Main image */}
            <div className="w-full max-w-4xl max-h-[70vh] mb-6 flex justify-center items-center">
              <Image
                src={`${process.env.NEXT_PUBLIC_API_URL}/assets/images/${images[selectedIndex].imageName}`}
                alt="Fullscreen Image"
                width={800}
                height={800}
                className="object-contain max-w-full max-h-full"
              />
            </div>

            {/* Thumbnail strip */}
            <div className="w-full max-w-4xl overflow-x-auto px-2 pb-4 fixed bottom-0">
              <div className="flex gap-2 justify-center">
                {images.map((image, index) => (
                  <button
                    key={image.id}
                    onClick={() => setSelectedIndex(index)}
                    className={`w-16 h-16 cursor-pointer flex-shrink-0 border rounded-md overflow-hidden focus:outline-none transition-all ${
                      index === selectedIndex
                        ? "border-white"
                        : "opacity-50 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={`${process.env.NEXT_PUBLIC_API_URL}/assets/images/${image.imageName}`}
                      alt={`Thumbnail ${index + 1}`}
                      width={64}
                      height={64}
                      className="object-contain w-full h-full"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
