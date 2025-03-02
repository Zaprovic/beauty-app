import Product from "@/components/product";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { db } from "@/db";
import { categories as categoriesTable } from "@/db/schema";
import { getProductsWithCategories } from "@/lib/db";
import { CategoryType } from "@/types";
import { unstable_cache } from "next/cache";
import { SearchX, ShoppingBag, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// EmptyStateComponent for reuse
function EmptyState({
  message,
  categoryName = null,
}: {
  message: string;
  categoryName?: string | null;
}) {
  return (
    <div className="col-span-full flex flex-col items-center justify-center gap-4 py-16 text-center sm:py-24">
      <div className="bg-muted rounded-full p-6 sm:p-8">
        <SearchX className="text-muted-foreground h-10 w-10 sm:h-12 sm:w-12" />
      </div>
      <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">
        No se encontraron productos
      </h3>
      <p className="text-muted-foreground max-w-md sm:max-w-lg">
        {message}
        {categoryName && <span className="font-medium"> {categoryName}</span>}
      </p>
      <div className="mt-4 flex flex-col gap-4 sm:flex-row">
        <Button asChild variant="outline" size="lg" className="gap-2">
          <Link href="/products">
            <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
            Ver todos los productos
          </Link>
        </Button>
        <Button asChild size="lg" className="gap-2">
          <Link href="/categories">
            <ShoppingBag className="h-4 w-4 sm:h-5 sm:w-5" />
            Explorar categorías
          </Link>
        </Button>
      </div>
    </div>
  );
}

export type ProductCategory = {
  id: string;
  name: string;
};

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
  { revalidate: 60 }, // Cache for 60 seconds
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
