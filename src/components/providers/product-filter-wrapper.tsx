"use client";

import { ProductWithCategoryType } from "@/types";

type props = {
  children: React.ReactNode;
  filteredProduct?: ProductWithCategoryType[];
  searchQuery?: string;
};

const ProductFilterWrapper = ({ children }: props) => {
  return <div id="product-filter-wrapper">{children}</div>;
};

export default ProductFilterWrapper;
