"use client";

import Product from "@/components/product";
import { useCartStore } from "@/stores/cart-store";
import { ProductWithCategoryType } from "@/types";

type props = {
  product: ProductWithCategoryType;
};

const ProductClientWrapper = ({ product }: props) => {
  const { isInCart, toggleItem } = useCartStore();
  return (
    <Product
      product={product}
      inCart={isInCart(product.id)}
      toggleItem={toggleItem}
    />
  );
};

export default ProductClientWrapper;
