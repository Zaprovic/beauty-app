// "use client";

import Product from "@/components/product";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { db } from "@/db";
import { categories as categoriesTable } from "@/db/schema";
import { getProductsWithCategories } from "@/lib/db";
import { CategoryType } from "@/types";

export type ProductCategory = {
  id: string;
  name: string;
};

type CategoryTabsProps = {
  categories: CategoryType[];
  // activeCategory: string;
  // onCategoryChange: (category: string) => void;
};

export async function CategoryTabs(
  {
    // categories,
    // activeCategory,
    // onCategoryChange,
  }: CategoryTabsProps,
) {
  const categories = await db.select().from(categoriesTable);

  const productsWithCategories = await getProductsWithCategories();

  return (
    <Tabs
      defaultValue={"Todos"}
      // value={activeCategory}
      // onValueChange={onCategoryChange}
      className="mb-8"
    >
      <TabsList className="flex h-auto w-full flex-wrap justify-center gap-2 p-2">
        {[
          {
            id: 99999,
            name: "Todos",
          },
          ...categories,
        ].map((cat) => (
          <TabsTrigger
            key={cat.id}
            value={cat.name}
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground flex-grow text-center"
          >
            {cat.name}
          </TabsTrigger>
        ))}
      </TabsList>

      <TabsContent
        value="Todos"
        className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-6"
      >
        {productsWithCategories.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </TabsContent>
    </Tabs>
  );
}
