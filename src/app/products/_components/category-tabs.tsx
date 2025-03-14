"use client";
import Product from "@/components/product";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CategoryType, ProductWithCategoryType } from "@/types";
import { useSearchProductStore } from "@/stores/search-product-store";
import EmptyState from "./empty-state";
import { useCartStore } from "@/stores/cart-store";
import { useEffect, useState } from "react";

type CategoryTabsProps = {
  categories: CategoryType[];
  productsWithCategories: ProductWithCategoryType[];
};

export function CategoryTabs({
  categories,
  productsWithCategories,
}: CategoryTabsProps) {
  const { query } = useSearchProductStore();
  const { isInCart, toggleItem } = useCartStore();

  const [, setProducts] = useState<ProductWithCategoryType[]>(
    productsWithCategories,
  );

  useEffect(() => {
    setProducts(productsWithCategories);
  }, [productsWithCategories]);

  // Filter products based on search query
  const filterProducts = (products: ProductWithCategoryType[]) => {
    if (!query) return products;

    return products.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase()),
    );
  };

  return (
    <>
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

        {/* "Todos" tab showing all filtered products */}
        <TabsContent
          value="Todos"
          className="mt-4 grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-6"
        >
          {filterProducts(productsWithCategories).length > 0 ? (
            filterProducts(productsWithCategories).map((product) => (
              <Product
                key={product.id}
                product={product}
                inCart={isInCart(product.id)}
                toggleItem={toggleItem}
              />
            ))
          ) : (
            <EmptyState message="No se encontraron productos" />
          )}
        </TabsContent>

        {/* Individual category tabs with filtering */}
        {categories.map((category) => {
          const filteredProducts = filterProducts(
            productsWithCategories.filter((product) =>
              product.categories.some((cat) => cat.id === category.id),
            ),
          );

          return (
            <TabsContent
              key={category.id}
              value={category.name}
              className="mt-4 grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-6"
            >
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <Product
                    key={product.id}
                    product={product}
                    inCart={isInCart(product.id)}
                    toggleItem={toggleItem}
                  />
                ))
              ) : (
                <EmptyState
                  categoryName={`'${category.name.toLocaleLowerCase()}'`}
                  message="No se encontraron productos"
                />
              )}
            </TabsContent>
          );
        })}
      </Tabs>
    </>
  );
}
