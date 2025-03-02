import Product from "@/components/product";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { db } from "@/db";
import { categories as categoriesTable } from "@/db/schema";
import { getProductsWithCategories } from "@/lib/db";
import { CategoryType } from "@/types";
import { unstable_cache } from "next/cache";
import EmptyState from "./empty-state";

type CategoryTabsProps = {
  categories: CategoryType[];
  searchParams: { [key: string]: string | string[] | undefined };
};

// Cache product data fetching to improve performance
const getCachedProducts = unstable_cache(
  async () => {
    return await getProductsWithCategories();
  },
  ["products-with-categories"],
  { revalidate: 300 }, // Cache for 300 seconds (5 minutes)
);

export async function CategoryTabs({ searchParams }: CategoryTabsProps) {
  const categories = await db.select().from(categoriesTable);
  const searchQuery = Array.isArray(searchParams.q)
    ? searchParams.q[0]
    : searchParams.q || "";

  // Use cached products data
  const productsWithCategories = await getCachedProducts();

  // Optimize filtering by using a more efficient algorithm
  const filteredProducts = searchQuery
    ? productsWithCategories.filter((product) => {
        const query = searchQuery.toLowerCase();
        return (
          product.name.toLowerCase().includes(query) ||
          product.description?.toLowerCase().includes(query) ||
          product.categories.some((cat) =>
            cat.name.toLowerCase().includes(query),
          )
        );
      })
    : productsWithCategories;

  // Find count of products per category for showing numbers
  const productCountByCategory = categories.reduce(
    (acc, category) => {
      acc[category.id] = filteredProducts.filter((product) =>
        product.categories.some((cat) => cat.id === category.id),
      ).length;
      return acc;
    },
    {} as Record<string, number>,
  );

  return (
    <Tabs defaultValue={"Todos"} className="mb-8">
      <TabsList className="flex h-auto w-full flex-wrap justify-center gap-2 p-2">
        <TabsTrigger
          key="all"
          value="Todos"
          className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground flex-grow text-center"
        >
          Todos ({filteredProducts.length})
        </TabsTrigger>
        {categories.map((cat) => (
          <TabsTrigger
            key={cat.id}
            value={cat.name}
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground flex-grow text-center"
          >
            {cat.name} ({productCountByCategory[cat.id] || 0})
          </TabsTrigger>
        ))}
      </TabsList>

      {/* "Todos" tab showing all products */}
      <TabsContent
        value="Todos"
        className="mt-4 grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-6"
      >
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Product key={product.id} product={product} />
          ))
        ) : (
          <EmptyState
            message={
              searchQuery
                ? `No pudimos encontrar productos que coincidan con "${searchQuery}". Por favor intente con otra búsqueda o explore nuestras categorías.`
                : "No hay productos disponibles en este momento. Por favor revise más tarde."
            }
          />
        )}
      </TabsContent>

      {/* Individual category tabs */}
      {categories.map((category) => {
        const categoryProducts = filteredProducts.filter((product) =>
          product.categories.some((cat) => cat.id === category.id),
        );

        return (
          <TabsContent
            key={category.id}
            value={category.name}
            className="mt-4 grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-6"
          >
            {categoryProducts.length > 0 ? (
              categoryProducts.map((product) => (
                <Product key={product.id} product={product} />
              ))
            ) : (
              <EmptyState
                message={
                  searchQuery
                    ? `No pudimos encontrar productos que coincidan con "${searchQuery}" en la categoría`
                    : "No hay productos disponibles en esta categoría en este momento. Por favor explore otras categorías."
                }
                categoryName={category.name}
              />
            )}
          </TabsContent>
        );
      })}
    </Tabs>
  );
}
