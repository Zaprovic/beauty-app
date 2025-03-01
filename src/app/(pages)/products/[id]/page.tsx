import { ShoppingCart, Heart, Star, ArrowLeft } from "lucide-react";
import { ProductType } from "@/types";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ProductTabs from "./_components/product-tabs";
import ProductImages from "./_components/product-images";
import { dummyProducts } from "@/data/dummy";

// todo: replace with your actual product API call
const fetchProduct = async (): Promise<ProductType> => {
  return dummyProducts[0];
};

// Convert to a server component by removing "use client"
export default async function ProductPage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  // Fetch the product data server-side
  let product: ProductType | null = null;
  const { id } = params;
  console.log(id);

  try {
    product = await fetchProduct();
  } catch (error) {
    console.error("Error fetching product:", error);
  }

  if (!product) {
    return (
      <div className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center px-4 py-16">
        <div className="flex flex-col items-center">
          <ShoppingCart size={150} className="mb-4" />
          <h1 className="mb-4 text-2xl font-bold -tracking-wider">
            Product not found
          </h1>
          <p className="mb-6">
            Sorry, the product you are looking for does not exist or is
            currently unavailable.
          </p>
          <Button asChild variant={"outline"}>
            <Link
              href={"/products"}
              className="hover:text-primary flex items-center transition-colors"
            >
              <ArrowLeft size={16} className="mr-2" />
              Back to products
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      {/* Breadcrumbs */}
      <div className="mb-6 flex items-center text-sm">
        <Button asChild variant={"outline"}>
          <Link href={"/"} className="hover:text-primary transition-colors">
            Home
          </Link>
        </Button>
        <span className="mx-2">/</span>
        <Button asChild variant={"outline"}>
          <Link
            href={"/products"}
            className="hover:text-primary transition-colors"
          >
            Products
          </Link>
        </Button>
        <span className="mx-2">/</span>
        <span className="font-medium">{product.name}</span>
      </div>

      <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Product Images */}
        <ProductImages product={product} />

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <p className="text-primary text-sm font-medium tracking-wider uppercase">
              {product.category}
            </p>
            <h1 className="mt-1 text-3xl font-bold md:text-4xl">
              {product.name}
            </h1>

            <div className="mt-3 flex items-center">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    fill={
                      i < Math.floor(product.rating ?? 0) ? "#F59E0B" : "none"
                    }
                    stroke={
                      i < Math.floor(product.rating ?? 0)
                        ? "#F59E0B"
                        : "#D1D5DB"
                    }
                    className={
                      i < Math.floor(product.rating ?? 0)
                        ? "text-amber-500"
                        : "text-gray-300"
                    }
                  />
                ))}
              </div>
              <p className="ml-2 text-sm">
                {product.rating} ({product.reviewCount} reviews)
              </p>
            </div>

            <p className="mt-4 text-2xl font-bold md:text-3xl">
              ${product.price.toFixed(2)}
            </p>
          </div>

          <div className="border-t pt-4">
            <p className="leading-relaxed">{product.description}</p>
          </div>

          <div className="flex items-center space-x-2 pt-4">
            <div className="h-3 w-3 rounded-full bg-emerald-500"></div>
            <p className="text-sm font-medium">
              {product.inStock ? "In Stock" : "Out of Stock"}
            </p>
          </div>

          <div className="flex flex-col gap-4 pt-6 sm:flex-row">
            <Button className="bg-primary hover:bg-primary/90 flex flex-1 items-center justify-center gap-2 rounded-md px-6 py-3 font-medium transition-colors">
              <ShoppingCart size={18} />
              Add to Cart
            </Button>
            <Button className="flex flex-1 items-center justify-center gap-2 rounded-md border px-6 py-3 font-medium transition-colors sm:flex-none">
              <Heart size={18} />
              Add to Wishlist
            </Button>
          </div>
        </div>
      </div>

      {/* Detailed Information Tabs */}
      <ProductTabs product={product} />
    </div>
  );
}
