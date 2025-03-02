import React from "react";

const ProductsLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className="fade-in mx-auto max-w-7xl">{children}</div>;
};

export default ProductsLayout;
