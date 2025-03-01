"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ProductType } from "@/types";

export default function ProductImages({ product }: { product: ProductType }) {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="space-y-4">
      <figure className="relative h-96 overflow-hidden rounded-xl bg-transparent">
        <Image
          src={product.images?.[selectedImage] || "/placeholder.jpg"}
          alt={product.name}
          fill
          className="rounded-xl object-contain"
          priority
        />
      </figure>
      <div className="flex gap-3 overflow-auto pb-2">
        {product.images?.map((img: string, index: number) => (
          <Button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border-2 ${
              selectedImage === index
                ? "border-primary"
                : "border-primary-foreground"
            }`}
          >
            <Image
              src={img ?? "/images/skincare.jpg"}
              alt={`${product.name} thumbnail ${index + 1}`}
              fill
              className="object-cover"
            />
          </Button>
        ))}
      </div>
    </div>
  );
}
