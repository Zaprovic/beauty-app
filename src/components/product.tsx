import React from "react";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Badge } from "./ui/badge";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { type ProductWithCategoryType } from "@/types";
import { HeartIcon } from "lucide-react";

const Product = async ({ product }: { product: ProductWithCategoryType }) => {
  return (
    <Card className="relative m-0 h-96 overflow-hidden p-0 transition-all hover:shadow-lg">
      {/* Discount Badge */}
      {product.discountPercentage != null && product.discountPercentage > 0 && (
        <div className="absolute top-2 left-2 z-10">
          <Badge className="bg-rose-500 font-medium text-white">
            {product.discountPercentage}% OFF
          </Badge>
        </div>
      )}

      {/* Heart Icon */}
      <div className="absolute top-2 right-2 z-10">
        <Button
          variant="secondary"
          size="icon"
          className="cursor-pointer rounded-full"
        >
          <HeartIcon className="h-5 w-5 text-gray-500 hover:text-rose-500" />
        </Button>
      </div>

      <div className="relative h-full w-full overflow-hidden">
        <Image
          src={product.mainImage}
          alt={product.name}
          fill
          className="object-contain"
        />
      </div>

      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <h3 className="line-clamp-1 text-base font-semibold">
            {product.name.charAt(0).toUpperCase() +
              product.name.slice(1).toLocaleLowerCase()}
          </h3>
        </div>
        <p className="text-muted-foreground mt-2 line-clamp-2 text-sm">
          {product.description}
        </p>
      </CardContent>

      <CardFooter className="flex justify-between p-4 pt-0">
        <div className="flex flex-col">
          {product.discountPercentage && product.discountPercentage > 0 ? (
            <>
              <p className="text-primary text-sm font-semibold">
                {new Intl.NumberFormat("es-CO", {
                  style: "currency",
                  currency: "COP",
                }).format(
                  (1 - product.discountPercentage / 100) * product.price,
                )}
              </p>
              <p className="text-muted-foreground text-xs line-through">
                {new Intl.NumberFormat("es-CO", {
                  style: "currency",
                  currency: "COP",
                }).format(product.price)}
              </p>
            </>
          ) : (
            <p className="text-primary text-sm font-semibold">
              {new Intl.NumberFormat("es-CO", {
                style: "currency",
                currency: "COP",
              }).format(product.price)}
            </p>
          )}
        </div>
        <Button asChild variant="outline" size="sm">
          <Link href={`/products/${product.id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Product;
