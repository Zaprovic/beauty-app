import React from "react";
import Link from "next/link";
import { CategoryType } from "@/types";

type Props = {
  currentCategoryId: number;
  relatedCategories: Array<Pick<CategoryType, "id" | "name">>;
  popularFilters: string[];
};

const CategorySidebar = ({
  currentCategoryId,
  relatedCategories,
  // popularFilters,
}: Props) => {
  return (
    <div className="hidden w-64 space-y-8 lg:block">
      {/* Related Categories */}
      <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
        <h3 className="mb-4 text-lg font-semibold text-gray-800">
          Related Categories
        </h3>
        <ul className="space-y-2.5">
          {relatedCategories.map((category) => (
            <li key={category.id}>
              <Link
                href={`/categories/${category.id}`}
                className={`block rounded-md px-3 py-2.5 text-sm ${
                  category.id === currentCategoryId
                    ? "bg-gray-100 font-medium text-black"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Price Range Filter */}
      {/* <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
        <h3 className="mb-4 text-lg font-semibold text-gray-800">
          Price Range
        </h3>
        <div className="space-y-2">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300"
            />
            <span className="text-sm text-gray-700">Under $25</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300"
            />
            <span className="text-sm text-gray-700">$25 - $50</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300"
            />
            <span className="text-sm text-gray-700">$50 - $100</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300"
            />
            <span className="text-sm text-gray-700">$100 - $200</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300"
            />
            <span className="text-sm text-gray-700">$200+</span>
          </label>
        </div>
      </div> */}

      {/* Popular Filters */}
      {/* <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
        <h3 className="mb-4 text-lg font-semibold text-gray-800">
          Popular Filters
        </h3>
        <div className="flex flex-wrap gap-2">
          {popularFilters.map((filter, index) => (
            <button
              key={index}
              className="rounded-full bg-gray-100 px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
            >
              {filter}
            </button>
          ))}
        </div>
      </div> */}

      {/* Product Features */}
      {/* <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
        <h3 className="mb-4 text-lg font-semibold text-gray-800">Features</h3>
        <div className="space-y-2">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300"
            />
            <span className="text-sm text-gray-700">Vegan</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300"
            />
            <span className="text-sm text-gray-700">Cruelty-Free</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300"
            />
            <span className="text-sm text-gray-700">Organic</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300"
            />
            <span className="text-sm text-gray-700">Fragrance-Free</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300"
            />
            <span className="text-sm text-gray-700">Hypoallergenic</span>
          </label>
        </div>
      </div> */}

      {/* Shopping Guide */}
      {/* <div className="rounded-xl border border-rose-100 bg-rose-50 p-5">
        <h3 className="mb-2 text-lg font-semibold text-gray-800">
          Shopping Guide
        </h3>
        <p className="mb-4 text-sm text-gray-600">
          Not sure what products are right for you? Check out our personalized
          recommendations.
        </p>
        <Link
          href="/quiz"
          className="inline-flex items-center rounded-lg bg-black px-4 py-2 text-sm text-white hover:bg-gray-800"
        >
          Take Beauty Quiz
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="ml-1 h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      </div> */}
    </div>
  );
};

export default CategorySidebar;
