"use client";

import { useState } from "react";
import Image from "next/image";
import { ProductType } from "@/types";

export default function ProductImages({ product }: { product: ProductType }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const hasImages = product.images && product.images.length > 0;

  return (
    <div className="flex flex-col space-y-4">
      {/* Main image container with max-height to prevent excessive size on large screens */}
      <div className="relative mx-auto w-full max-w-xl overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm">
        <div className="aspect-square w-full">
          <Image
            src={product.images?.[selectedImage] ?? product.mainImage}
            alt={product.name}
            fill
            className="object-contain p-6"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </div>

      {/* Thumbnails with scrollable container for many images */}
      {hasImages && (product.images?.length ?? 0) > 1 ? (
        <div className="scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent flex snap-x space-x-3 overflow-auto pb-2">
          {product.images?.map((img: string, index: number) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`relative flex-shrink-0 snap-center overflow-hidden rounded-md transition-all ${
                selectedImage === index
                  ? "ring-primary ring-2 ring-offset-1"
                  : "ring-1 ring-gray-200 hover:ring-gray-300"
              }`}
              aria-label={`View image ${index + 1}`}
            >
              <div className="h-16 w-16 sm:h-20 sm:w-20">
                <Image
                  src={img}
                  alt={`${product.name} thumbnail ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
