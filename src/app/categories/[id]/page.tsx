import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/db";
import { productCategories, products, categories } from "@/db/schema";
import { eq, ne } from "drizzle-orm";
import HeroBanner from "./_components/hero-banner";
import ProductGrid from "./_components/product-grid";
import FeaturedSection from "./_components/featured-section";
import CategorySidebar from "./_components/category-sidebar";

// Get category name
async function getCategoryName(id: string) {
  try {
    const category = await db
      .select({
        id: categories.id,
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

// Get related categories
async function getRelatedCategories(categoryId: number) {
  try {
    // Get up to 5 other categories
    const relatedCategories = await db
      .select({
        id: categories.id,
        name: categories.name,
      })
      .from(categories)
      .where(ne(categories.id, categoryId))
      .limit(5);

    return relatedCategories;
  } catch (error) {
    console.error("Failed to fetch related categories:", error);
    return [];
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

  // Fetch related categories
  const relatedCategories = await getRelatedCategories(Number(id));

  // Sample popular filters for the category
  const popularFilters = [
    "New Arrivals",
    "Best Sellers",
    "On Sale",
    "Vegan",
    "Cruelty-Free",
  ];

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
      <HeroBanner category={categoryInfo} />

      {/* Products Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <h2 className="0 text-3xl font-bold">
            <span className="mr-3">{categoryInfo.name} Collection</span>
            <span className="rounded-full bg-gray-100 px-4 py-1 text-lg font-medium">
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
            <div className="text- pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
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

        {/* Products section with sidebars */}
        <div className="flex flex-wrap gap-8 lg:flex-nowrap">
          {/* Left sidebar */}
          <CategorySidebar
            currentCategoryId={Number(id)}
            relatedCategories={relatedCategories}
            popularFilters={popularFilters}
          />

          {/* Product Grid - center main content */}
          <div className="flex-1">
            <ProductGrid processedProducts={processedProducts} />
          </div>

          {/* Right sidebar */}
          {/* <InfoSidebar 
            trendingProducts={trendingProducts} 
            categoryName={categoryInfo.name}
          /> */}
        </div>

        {/* Featured section at the bottom */}
        <FeaturedSection categoryInfo={categoryInfo} />
      </div>
    </div>
  );
};

export default SingleCategoryPage;
