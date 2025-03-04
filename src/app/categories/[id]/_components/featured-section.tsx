import { CategoryType } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type props = {
  categoryInfo: Partial<CategoryType>;
};

const FeaturedSection = ({ categoryInfo }: props) => {
  return (
    <div className="mt-20 rounded-2xl bg-gradient-to-r from-gray-100 to-gray-50 p-8 shadow-sm md:p-12 lg:p-16">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div>
          <h3 className="mb-4 text-2xl font-bold text-gray-800 md:text-3xl">
            Why Choose Our {categoryInfo.name}?
          </h3>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <div className="rounded-full bg-green-500 p-1 text-white">
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
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <p className="text-lg text-gray-700">
                Premium quality ingredients sourced ethically
              </p>
            </li>
            <li className="flex items-start gap-3">
              <div className="rounded-full bg-green-500 p-1 text-white">
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
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <p className="text-lg text-gray-700">
                Dermatologically tested and approved formulas
              </p>
            </li>
            <li className="flex items-start gap-3">
              <div className="rounded-full bg-green-500 p-1 text-white">
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
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <p className="text-lg text-gray-700">
                Cruelty-free and environmentally conscious packaging
              </p>
            </li>
          </ul>
          <div className="mt-8">
            <Link
              href="/about"
              className="inline-flex items-center rounded-lg bg-black px-6 py-3 text-white hover:bg-gray-800"
            >
              <span>Learn More About Our Products</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="ml-2 h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div className="relative h-64 w-64 overflow-hidden rounded-full md:h-80 md:w-80">
            <Image
              src="/images/beauty-01.webp"
              alt="Quality Guarantee"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedSection;
