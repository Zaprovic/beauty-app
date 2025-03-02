import { CategoryTabs } from "./category-tabs";
import { CategoryType, ProductType } from "@/types";

type props = {
  categories: CategoryType[];
  initialProducts: ProductType[];
};

export function ProductsFilterContainer({ categories }: props) {
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
