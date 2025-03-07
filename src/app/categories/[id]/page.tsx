import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/db";
import { productCategories, products, categories } from "@/db/schema";
import { eq } from "drizzle-orm";

// Get category name
async function getCategoryName(id: string) {
  try {
    const category = await db
      .select({
        name: categories.name,
      })
      .from(categories)
      .where(eq(categories.id, Number(id)))
      .limit(1);

    return category.length > 0 ? category[0] : null;
  } catch (error) {
    console.error("Failed to fetch category:", error);
    return null;
  }
}

const SingleCategoryPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  // Fetch category info
  const categoryInfo = await getCategoryName(id);

  if (!categoryInfo) {
    notFound();
  }

  // Fetch all products in this category
  const productsCategories = await db
    .select({
      id: productCategories.productId,
      name: products.name,
      price: products.price,
      brand: products.brand,
      mainImage: products.mainImage,
      description: products.description,
      discountPercentage: products.discountPercentage,
      images: products.images,
      benefits: products.benefits,
      howToUse: products.howToUse,
      ingredients: products.ingredients,
      inStock: products.inStock,
    })
    .from(productCategories)
    .where(eq(productCategories.categorieId, Number(id)))
    .innerJoin(products, eq(productCategories.productId, products.id));

  if (!productsCategories.length) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h1 className="mb-8 text-4xl font-bold text-gray-800 md:text-5xl">
          {categoryInfo.name}
        </h1>
        <p className="mb-12 text-xl">
          Explore our range of premium beauty products. We&apos;re constantly
          updating our collection with the latest innovations in beauty and
          skincare.
        </p>
        <div className="mx-auto max-w-md rounded-xl p-12 shadow-lg">
          <div className="mb-6 text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mx-auto h-16 w-16"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M20 12H4M4 12L10 6M4 12L10 18"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-medium">No products found</h2>
          <p className="mt-3">
            We&apos;re currently updating our collection. Check back soon for
            new additions.
          </p>
          <Link
            href="/categories"
            className="mt-8 inline-block rounded-lg px-8 py-3 shadow-md"
          >
            Explore Other Categories
          </Link>
        </div>
      </div>
    );
  }

  // Calculate discounted prices
  const processedProducts = productsCategories.map((product) => ({
    ...product,
    finalPrice: product.discountPercentage
      ? product.price - product.price * (product.discountPercentage / 100)
      : product.price,
  }));

  return (
    <div className="">
      {/* Hero Banner */}
      <div className="from-bg-primary via-bg-secondary to-bg-primary-foreground relative overflow-hidden bg-gradient-to-r">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-[url('/images/pattern-bg.png')] bg-repeat opacity-10"></div>
        </div>
        <div className="relative container mx-auto px-4 py-24 text-center">
          <h1 className="mb-6 bg-clip-text text-4xl font-bold md:text-5xl lg:text-6xl">
            {categoryInfo.name}
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-xl">
            {`Discover our exclusive collection of premium ${categoryInfo.name} products, crafted with the finest ingredients to enhance your natural beauty and elevate your self-care routine.`}
          </p>
          <div className="flex justify-center">
            <Link
              href="/categories"
              className="group flex items-center gap-2 rounded-full px-6 py-3 shadow-md hover:shadow-lg"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
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

      {/* Products Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <h2 className="0 text-3xl font-bold">
            <span className="mr-3">{categoryInfo.name} Collection</span>
            <span className="rounded-full px-4 py-1 text-lg font-medium">
              {processedProducts.length} products
            </span>
          </h2>

          {/* Filter/Sort Dropdown */}
          <div className="relative inline-block w-full rounded-lg border md:w-64">
            <select className="w-full appearance-none rounded-lg px-4 py-3 pr-10 focus:outline-none">
              <option>Sort by: Featured</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Newest First</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
              <svg
                className="h-4 w-4 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {processedProducts.map((product) => (
            <div
              key={product.id}
              className="bordershadow-sm overflow-hidden rounded-xl hover:shadow-lg"
            >
              {/* Product Image */}
              <div className="relative h-72 w-full overflow-hidden">
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
                  {product.discountPercentage &&
                    product.discountPercentage > 0 && (
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
                  {product.discountPercentage &&
                  product.discountPercentage > 0 ? (
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-bold text-gray-900">
                        {new Intl.NumberFormat("es-CO", {
                          style: "currency",
                          currency: "COP",
                        }).format(product.finalPrice)}
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

        {/* Featured section at the bottom */}
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
                  src="/images/quality-badge.png"
                  alt="Quality Guarantee"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleCategoryPage;
