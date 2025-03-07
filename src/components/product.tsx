import React from "react";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Badge } from "./ui/badge";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { type ProductWithCategoryType } from "@/types";
import { HeartIcon, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const roundToHundredBelow = (price: number) => {
  return Math.floor(price / 100) * 100;
};

const Product = async ({ product }: { product: ProductWithCategoryType }) => {
  const outOfStock = product.inStock === false;

  return (
    <Card
      className={cn("relative m-0 h-96 overflow-hidden p-0 transition-all", {
        "opacity-80": outOfStock,
        "hover:shadow-lg": !outOfStock,
      })}
    >
      {product.discountPercentage != null && product.discountPercentage > 0 && (
        <div className="absolute top-2 left-2 z-10">
          <Badge className="bg-rose-500 font-medium text-white">
            {product.discountPercentage}% OFF
          </Badge>
        </div>
      )}

      {outOfStock && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/50">
          <Badge className="bg-gray-800 px-4 py-2 text-lg font-bold text-white">
            Agotado
          </Badge>
        </div>
      )}

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
          className={cn("object-contain", {
            grayscale: outOfStock,
          })}
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
                  roundToHundredBelow(
                    (1 - product.discountPercentage / 100) * product.price,
                  ),
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
        {outOfStock ? (
          <Button
            variant="outline"
            size="sm"
            disabled
            className="cursor-not-allowed opacity-70"
          >
            <AlertCircle className="mr-1 h-4 w-4" />
            Agotado
          </Button>
        ) : (
          <Button asChild variant="outline" size="sm">
            <Link href={`/products/${product.id}`}>Ver detalles</Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default Product;
