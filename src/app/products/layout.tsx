import React from "react";
import { SearchProducts } from "./_components/search-products";

const ProductsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="fade-in mx-auto max-w-7xl">
      <SearchProducts />
      {children}
    </div>
  );
};

export default ProductsLayout;
