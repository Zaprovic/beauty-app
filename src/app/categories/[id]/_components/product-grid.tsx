import Image from "next/image";
import Link from "next/link";
import React from "react";

type props = {
  processedProducts: {
    id: number;
    name: string;
    price: number;
    brand: string;
    mainImage: string;
    description: string;
    discountPercentage: number | null;
    images: string[] | null;
    benefits: string[] | null;
    howToUse: string | null;
    ingredients: string[] | null;
    inStock: boolean | null;
  }[];
};

const ProductGrid = ({ processedProducts }: props) => {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {processedProducts.map((product) => (
        <div
          key={product.id}
          className="overflow-hidden rounded-xl bg-white shadow-sm hover:shadow-lg"
        >
          {/* Product Image */}
          <div className="relative h-72 w-full overflow-hidden bg-gray-50">
            <Link href={`/products/${product.id}`}>
              <Image
                src={product.mainImage || "/images/placeholder.jpg"}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-300 hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />

              {/* Out of stock indicator */}
              {!product.inStock && (
                <div className="bg-opacity-50 absolute inset-0 flex items-center justify-center bg-black backdrop-blur-sm">
                  <span className="bg-opacity-80 rounded-lg bg-black px-4 py-2 text-sm font-medium text-white">
                    Currently Unavailable
                  </span>
                </div>
              )}

              {/* Discount badge */}
              {product.discountPercentage && product.discountPercentage > 0 && (
                <div className="absolute top-3 right-3 rounded-full bg-rose-500 px-3 py-1 text-xs font-bold text-white shadow-md">
                  {product.discountPercentage}% OFF
                </div>
              )}
            </Link>
          </div>

          {/* Product Info */}
          <div className="p-5">
            <div className="mb-1 text-xs font-semibold tracking-wider text-gray-500 uppercase">
              {product.brand}
            </div>

            <Link href={`/products/${product.id}`}>
              <h3 className="mb-2 line-clamp-2 text-lg font-medium text-gray-800 hover:text-rose-600">
                {product.name}
              </h3>
            </Link>

            {/* Price display */}
            <div className="mb-3">
              {product.discountPercentage && product.discountPercentage > 0 ? (
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold text-gray-900">
                    {new Intl.NumberFormat("es-CO", {
                      style: "currency",
                      currency: "COP",
                    }).format(product.price)}
                  </span>
                  <span className="text-sm text-gray-500 line-through">
                    {new Intl.NumberFormat("es-CO", {
                      style: "currency",
                      currency: "COP",
                    }).format(product.price)}
                  </span>
                </div>
              ) : (
                <span className="text-xl font-bold text-gray-900">
                  {new Intl.NumberFormat("es-CO", {
                    style: "currency",
                    currency: "COP",
                  }).format(product.price)}
                </span>
              )}
            </div>

            {/* Brief description */}
            <p className="mb-5 line-clamp-2 text-sm text-gray-600">
              {product.description}
            </p>

            {/* Action buttons */}
            <div className="flex gap-2">
              <Link
                href={`/products/${product.id}`}
                className={`flex-1 rounded-lg py-2.5 text-center text-sm font-medium transition-colors ${
                  product.inStock
                    ? "bg-black text-white hover:bg-gray-800"
                    : "cursor-not-allowed bg-gray-200 text-gray-500"
                }`}
                aria-disabled={!product.inStock}
              >
                {product.inStock ? "View Details" : "Out of Stock"}
              </Link>

              {product.inStock && (
                <button
                  className="flex items-center justify-center rounded-lg bg-gray-100 p-2.5 text-gray-700 hover:bg-gray-200"
                  aria-label="Add to wishlist"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
