import { dummyProducts } from "@/data/dummy";
import { ProductsFilterContainer } from "./_components/product-filter-container";

const productCategories = [
  { id: "all", label: "All Products" },
  { id: "skincare", label: "Skincare" },
  { id: "makeup", label: "Makeup" },
  { id: "haircare", label: "Haircare" },
  { id: "bodycare", label: "Body Care" },
  { id: "fragrances", label: "Fragrances" },
];

export default function ProductsPage() {
  const products = dummyProducts;

  return (
    <ProductsFilterContainer
      categories={productCategories}
      initialProducts={products}
    />
  );
}
