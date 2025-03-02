"use client";

import { PackageSearch } from "lucide-react";
import Product from "@/components/product";
import { ProductType } from "@/types";

type ProductGridProps = {
  products: (ProductType & {
    categoryName: string;
  })[];
};

export function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center py-16 text-center">
        <PackageSearch className="text-muted-foreground mb-4 h-20 w-20" />
        <h3 className="mb-2 text-xl font-medium">No products found</h3>
        <p className="text-muted-foreground">
          Try adjusting your search or filter criteria
        </p>
      </div>
    );
  }

  return (
    <ul className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-6">
      {products.map((product) => (
        <li key={product.id}>
          <Product product={product} />
        </li>
      ))}
    </ul>
  );
}
