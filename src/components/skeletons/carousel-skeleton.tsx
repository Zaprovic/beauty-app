import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const CarouselSkeleton = () => {
  return (
    <section className="mx-auto border-b py-16">
      <div className="px-4">
        {/* Section title and subtitle skeletons */}
        <div className="mb-4 flex flex-col items-center justify-center">
          <Skeleton className="mb-4 h-8 w-48" /> {/* Title */}
          <Skeleton className="mb-12 h-5 w-40" /> {/* Subtitle */}
        </div>

        {/* Carousel wrapper skeleton */}
        <div className="mx-auto max-w-5xl">
          {/* Carousel Controls Skeleton */}
          <div className="mb-4 flex items-center justify-between">
            <div className="flex-1"></div>{" "}
            {/* Empty space matching the layout */}
            <div className="flex space-x-2">
              <Skeleton className="h-8 w-8 rounded-full" />{" "}
              {/* Previous button */}
              <Skeleton className="h-8 w-8 rounded-full" /> {/* Next button */}
            </div>
          </div>

          {/* Carousel Items Skeleton */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {Array(4)
              .fill(null)
              .map((_, index) => (
                <div key={index} className="flex flex-col space-y-3">
                  {/* Card image skeleton */}
                  <div className="relative">
                    <Skeleton className="aspect-[3/4] h-52 w-full rounded-xl" />

                    {/* Shimmer effect */}
                    <div className="absolute inset-0 overflow-hidden rounded-xl">
                      <div className="animate-shimmer absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                    </div>
                  </div>
                  {/* Product details skeleton */}
                  <Skeleton className="h-5 w-3/4" /> {/* Product name */}
                  <Skeleton className="h-4 w-1/2" /> {/* Category */}
                  <div className="flex justify-between">
                    <Skeleton className="h-6 w-20" /> {/* Price */}
                    <Skeleton className="h-9 w-9 rounded-full" />{" "}
                    {/* Add to cart button */}
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* View All Products button skeleton */}
        <div className="mt-10 flex justify-center">
          <Skeleton className="h-10 w-40 rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default CarouselSkeleton;
