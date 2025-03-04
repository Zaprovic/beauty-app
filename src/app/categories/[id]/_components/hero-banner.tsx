import { CategoryType } from "@/types";
import Link from "next/link";
import React from "react";

type props = {
  category: Partial<CategoryType>;
};

const HeroBanner = ({ category: categoryInfo }: props) => {
  return (
    <div className="from-bg-primary via-bg-secondary to-bg-primary-foreground relative overflow-hidden bg-gradient-to-r">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[url('/images/pattern-bg.png')] bg-repeat opacity-10"></div>
      </div>
      <div className="relative container mx-auto px-4 py-12 text-center">
        <h1 className="mb-3 bg-clip-text text-3xl font-bold md:text-4xl">
          {categoryInfo.name}
        </h1>
        <p className="mx-auto mb-5 max-w-2xl text-lg">
          {`Discover our exclusive collection of premium ${categoryInfo.name} products, crafted with the finest ingredients to enhance your natural beauty.`}
        </p>
        <div className="flex justify-center">
          <Link
            href="/categories"
            className="group flex items-center gap-2 rounded-full px-5 py-2 shadow-md hover:shadow-lg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span>Back to All Categories</span>
          </Link>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="bg-primary-foreground absolute -bottom-16 -left-16 h-32 w-32 rounded-full opacity-60 blur-3xl"></div>
      <div className="bg-primary-foreground absolute top-10 -right-16 h-32 w-32 rounded-full opacity-60 blur-3xl"></div>
    </div>
  );
};

export default HeroBanner;
