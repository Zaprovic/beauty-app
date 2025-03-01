"use client";

import Image from "next/image";
import { PackageSearch, Tag } from "lucide-react";

type CategoryContent = {
  title: string;
  description: string;
  image: string;
};

type ProductHeroSectionProps = {
  categoryContent: CategoryContent;
  productCount: number;
  lowestPrice: string;
  category: string;
};

export function ProductHeroSection({
  categoryContent,
  productCount,
  lowestPrice,
  category,
}: ProductHeroSectionProps) {
  return (
    <div className="from-primary/5 via-background to-primary/5 dark:from-primary/10 dark:via-background dark:to-primary/10 top-0 z-10 overflow-hidden border-b bg-gradient-to-r backdrop-blur-sm">
      <div className="bg-grid-pattern absolute inset-0 opacity-10"></div>
      <div className="relative container mx-auto max-w-7xl px-4 py-4 md:py-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          {/* Left side - Image and text */}
          <div className="flex items-start space-x-4 md:w-7/12">
            {/* Category image - slightly smaller for sticky header */}
            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl md:h-24 md:w-24">
              <div className="from-primary/30 absolute inset-0 bg-gradient-to-tr to-transparent opacity-70"></div>
              <Image
                src={"/images/beauty-01.webp"}
                alt={`${category} products`}
                fill
                className="object-cover"
              />
            </div>

            {/* Text content - more concise for sticky header */}
            <div className="flex flex-col justify-center">
              <h1 className="mb-1 text-xl font-bold tracking-tight md:text-2xl">
                {categoryContent.title}
              </h1>
              <p className="text-muted-foreground line-clamp-2 max-w-md text-xs md:text-sm">
                {categoryContent.description}
              </p>
            </div>
          </div>

          {/* Right side - Stats cards */}
          <div className="flex flex-1 space-x-3 md:justify-end">
            {/* Product count card */}
            <div className="bg-card flex items-center rounded-lg border p-3 shadow-sm transition-all hover:shadow">
              <div className="bg-primary/10 mr-2 flex h-8 w-8 items-center justify-center rounded-full">
                <PackageSearch className="text-primary h-4 w-4" />
              </div>
              <div>
                <p className="text-xs font-medium">{productCount}</p>
                <p className="text-muted-foreground text-xs">Products</p>
              </div>
            </div>

            {/* Price range card */}
            <div className="bg-card flex items-center rounded-lg border p-3 shadow-sm transition-all hover:shadow">
              <div className="bg-primary/10 mr-2 flex h-8 w-8 items-center justify-center rounded-full">
                <Tag className="text-primary h-4 w-4" />
              </div>
              <div>
                <p className="text-xs font-medium">${lowestPrice}</p>
                <p className="text-muted-foreground text-xs">Starting price</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
