import Image from "next/image";
import Link from "next/link";
import { Star, ShoppingCart, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { dummyProducts } from "@/data/dummy";
import { ProductType } from "@/types";
import ModalWrapper from "@/components/providers/modal-wrapper";

// Server component for fetching product data
async function getProduct(id: string): Promise<ProductType | null> {
  try {
    // In a real app, this would be an API or database call
    const product = dummyProducts.find((p) => p.id.toString() === id);
    return product || null;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

export default async function ProductModal({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    return (
      <ModalWrapper>
        <div className="py-8 text-center">
          <p>Product not found</p>
        </div>
      </ModalWrapper>
    );
  }

  return (
    <ModalWrapper>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Product Image */}
        <div className="relative aspect-square overflow-hidden rounded-md">
          <Image
            src={"/images/beauty-01.webp"}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 400px"
            priority
          />
        </div>

        {/* Product Details */}
        <div className="flex flex-col space-y-4">
          <div>
            <p className="text-primary text-sm font-medium tracking-wider uppercase">
              {product.category}
            </p>
            <h2 className="text-2xl font-bold">{product.name}</h2>
            <p className="text-2xl font-bold text-gray-900">
              ${product.price.toFixed(2)}
            </p>
          </div>

          {/* Rating */}
          <div className="flex items-center">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  fill={
                    i < Math.floor(product.rating ?? 0) ? "#F59E0B" : "none"
                  }
                  stroke={
                    i < Math.floor(product.rating ?? 0) ? "#F59E0B" : "#D1D5DB"
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

          {/* Description */}
          <p className="text-sm text-gray-600">{product.description}</p>

          {/* Stock Status */}
          <div className="flex items-center space-x-2">
            <div
              className={`h-3 w-3 rounded-full ${product.inStock ? "bg-emerald-500" : "bg-red-500"}`}
            ></div>
            <p className="text-sm font-medium">
              {product.inStock ? "In Stock" : "Out of Stock"}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-2 pt-4 sm:flex-row">
            <Button className="bg-primary hover:bg-primary/90 flex items-center gap-2">
              <ShoppingCart size={16} />
              Add to Cart
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Heart size={16} />
              Wishlist
            </Button>
          </div>

          {/* View Full Details Link */}
          <Button
            variant="link"
            className="text-primary h-auto justify-start p-0"
            asChild
          >
            <Link
              href={`/products/${product.id}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              View full product details
            </Link>
          </Button>
        </div>
      </div>
    </ModalWrapper>
  );
}
