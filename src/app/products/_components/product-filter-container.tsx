// "use client";

// import { useState, useMemo } from "react";
import { CategoryTabs } from "./category-tabs";
// import { ProductGrid } from "./product-grid";
// import { ProductHeroSection } from "./product-hero-section";
// import { SearchProducts } from "./search-products";
import { CategoryType, ProductType } from "@/types";

// Category hero content
// const categoryContent = {
//   all: {
//     title: "Discover Our Complete Collection",
//     description:
//       "Explore our carefully curated selection of premium beauty products designed to enhance your natural beauty and nourish your body from head to toe.",
//     image: "/images/heroes/all-products.jpg",
//   },
//   skincare: {
//     title: "Transform Your Skin",
//     description:
//       "Our skincare products use proven ingredients to target specific concerns, from hydration to anti-aging. Discover formulas that work with your skin, not against it.",
//     image: "/images/heroes/skincare.jpg",
//   },
//   makeup: {
//     title: "Express Your Beauty",
//     description:
//       "From everyday essentials to special occasion glamour, our makeup collection offers high-performance formulas with stunning color payoff and staying power.",
//     image: "/images/heroes/makeup.jpg",
//   },
//   haircare: {
//     title: "Healthy Hair, Happy You",
//     description:
//       "Give your hair the love it deserves with our range of shampoos, conditioners, and treatments designed to repair, protect, and enhance every hair type.",
//     image: "/images/heroes/haircare.jpg",
//   },
//   bodycare: {
//     title: "Pamper Your Body",
//     description:
//       "Indulge in luxurious body care products that cleanse, exfoliate, and moisturize, leaving your skin feeling smooth, soft, and beautifully scented.",
//     image: "/images/heroes/bodycare.jpg",
//   },
//   fragrances: {
//     title: "Find Your Signature Scent",
//     description:
//       "Our collection of fragrances offers everything from light, everyday scents to rich, complex perfumes that make a lasting impression.",
//     image: "/images/heroes/fragrances.jpg",
//   },
// };

type props = {
  categories: CategoryType[];
  initialProducts: ProductType[];
};

export function ProductsFilterContainer({
  categories,
  // initialProducts,
}: props) {
  // const [category, setCategory] = useState("Todos");
  // const [searchQuery, setSearchQuery] = useState("");

  // const filteredProducts = useMemo(() => {
  //   let result = initialProducts;

  //   // Filter by category
  //   if (category !== "Todos") {
  //     result = result.filter((product) => product.category === category);
  //   }

  //   // Filter by search query
  //   if (searchQuery) {
  //     result = result.filter(
  //       (product) =>
  //         product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //         product.description.toLowerCase().includes(searchQuery.toLowerCase()),
  //     );
  //   }

  //   return result;
  // }, [category, searchQuery, initialProducts]);

  // const currentCategoryContent =
  //   categoryContent[category as keyof typeof categoryContent];

  // // Calculate lowest price for the category
  // const lowestPrice =
  //   filteredProducts.length > 0
  //     ? Math.min(...filteredProducts.map((p) => p.price)).toFixed(2)
  //     : "0.00";

  return (
    <div className="fade-in mx-auto max-w-5xl">
      {/* Hero Section */}
      {/* <ProductHeroSection
        categoryContent={currentCategoryContent}
        productCount={filteredProducts.length}
        lowestPrice={lowestPrice}
        category={category}
      /> */}
      <div className="container mx-auto max-w-7xl px-4 py-8">
        {/* <SearchProducts onSearch={setSearchQuery} /> */}
        <CategoryTabs
          categories={categories}
          // activeCategory={category}
          // onCategoryChange={setCategory}
        />
      </div>
    </div>
  );
}
