import Product from "@/components/product";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton"; // Import the Skeleton component
import { db } from "@/db";
import { categories as categoriesTable } from "@/db/schema";
import { getProductsWithCategories } from "@/lib/db";
import { CategoryType } from "@/types";
import { Suspense } from "react";

export type ProductCategory = {
  id: string;
  name: string;
};

type CategoryTabsProps = {
  categories: CategoryType[];
};

export async function CategoryTabs({}: CategoryTabsProps) {
  const categories = await db.select().from(categoriesTable);

  const productsWithCategories = await getProductsWithCategories();

  return (
    <Tabs defaultValue={"Todos"} className="mb-8">
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

      <Suspense
        fallback={
          <TabsContent
            value="Todos"
            className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-6"
          >
            {productsWithCategories.map((_, index) => (
              <Skeleton
                key={index}
                className="relative m-0 mt-4 h-96 overflow-hidden p-0 transition-all hover:shadow-lg"
              />
            ))}
          </TabsContent>
        }
      >
        {/* "Todos" tab showing all products */}
        <TabsContent
          value="Todos"
          className="mt-4 grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-6"
        >
          {productsWithCategories.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </TabsContent>

        {/* Individual category tabs */}
        {categories.map((category) => (
          <TabsContent
            key={category.id}
            value={category.name}
            className="mt-4 grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-6"
          >
            {productsWithCategories
              .filter((product) =>
                product.categories.some((cat) => cat.id === category.id),
              )
              .map((product) => (
                <Product key={product.id} product={product} />
              ))}
          </TabsContent>
        ))}
      </Suspense>
    </Tabs>
  );
}
