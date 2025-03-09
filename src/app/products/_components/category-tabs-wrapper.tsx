import { db } from "@/db";
import { categories as categoriesTable } from "@/db/schema";
import { getProductsWithCategories } from "@/lib/db";
import { CategoryTabs } from "./category-tabs";

const CategoryTabsWrapper = async () => {
  const categories = await db.select().from(categoriesTable);
  const productsWithCategories = await getProductsWithCategories();
  return (
    <CategoryTabs
      categories={categories}
      productsWithCategories={productsWithCategories}
    />
  );
};

export default CategoryTabsWrapper;
