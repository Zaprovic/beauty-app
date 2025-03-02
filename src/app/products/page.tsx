import { db } from "@/db";
import { ProductsFilterContainer } from "./_components/product-filter-container";
import { categories as categoriesTable } from "@/db/schema";
import { getProductsWithCategories } from "@/lib/db";

export default async function ProductsPage() {
  // const products = dummyProducts;
  const products = await getProductsWithCategories();
  const categories = await db.select().from(categoriesTable);

  return (
    <ProductsFilterContainer
      categories={categories}
      initialProducts={products}
    />
  );
}
