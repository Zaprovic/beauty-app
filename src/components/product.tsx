"use client";

import React from "react";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Badge } from "./ui/badge";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { type ProductWithCategoryType } from "@/types";
import {
  HeartIcon,
  AlertCircle,
  CheckIcon,
  PlusIcon,
  MinusIcon,
} from "lucide-react";
import { cn, formatCOP } from "@/lib/utils";

type props = {
  product: ProductWithCategoryType;
  inCart?: boolean;
  toggleItem?: (p: ProductWithCategoryType) => void;
};

const roundToHundredBelow = (price: number) => {
  return Math.floor(price / 100) * 100;
};

const Product = ({ product, inCart, toggleItem }: props) => {
  const outOfStock = product.inStock === false;

  return (
    <Card
      className={cn("relative m-0 h-96 overflow-hidden p-0 transition-all", {
        "opacity-80": outOfStock,
        "hover:shadow-lg dark:hover:shadow-emerald-900/10": !outOfStock,
        "ring-1 ring-emerald-500 dark:ring-emerald-400": inCart,
      })}
    >
      {/* Discount badge */}
      {product.discountPercentage != null && product.discountPercentage > 0 && (
        <div className="absolute top-2 left-2 z-10">
          <Badge className="bg-rose-500 font-medium text-white dark:bg-rose-600">
            {product.discountPercentage}% OFF
          </Badge>
        </div>
      )}

      {/* Out of stock overlay */}
      {outOfStock && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/50 dark:bg-black/70">
          <Badge className="bg-gray-800 px-4 py-2 text-lg font-bold text-white dark:bg-gray-700">
            Agotado
          </Badge>
        </div>
      )}

      {/* Top action buttons */}
      <div className="absolute top-2 right-2 z-20 flex gap-1">
        {/* Heart/favorite icon */}
        <Button
          variant="secondary"
          size="icon"
          className="h-8 w-8 rounded-full opacity-90 backdrop-blur-sm hover:opacity-100"
        >
          <HeartIcon className="h-4 w-4 text-gray-600 hover:text-rose-500 dark:text-gray-300 dark:hover:text-rose-400" />
        </Button>

        {/* Cart toggle icon - only show if not out of stock */}
        {!outOfStock && (
          <Button
            variant={inCart ? "default" : "secondary"}
            size="icon"
            className={cn(
              "h-8 w-8 rounded-full opacity-90 backdrop-blur-sm hover:opacity-100",
              {
                "bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-700":
                  inCart,
              },
            )}
            onClick={() => toggleItem && toggleItem(product)}
            aria-label={inCart ? "Remove from cart" : "Add to cart"}
            title={inCart ? "Remove from cart" : "Add to cart"}
          >
            {inCart ? (
              <MinusIcon className="h-4 w-4 text-white" />
            ) : (
              <PlusIcon className="h-4 w-4 dark:text-gray-200" />
            )}
          </Button>
        )}
      </div>

      {/* Product image with cart indicator ribbon */}
      <div className="relative h-64 w-full overflow-hidden bg-gray-50 dark:bg-gray-900">
        {/* Cart indicator ribbon - positioned at bottom left of image */}
        {inCart && !outOfStock && (
          <div className="absolute bottom-0 left-0 z-10 bg-emerald-500 px-2 py-1 text-xs text-white shadow-sm dark:bg-emerald-600">
            <CheckIcon className="mr-1 inline-block h-3 w-3" />
            En carrito
          </div>
        )}

        <Image
          src={product.mainImage}
          alt={product.name}
          fill
          className={cn("object-contain p-2", {
            grayscale: outOfStock,
          })}
        />
      </div>

      <CardContent className="p-4 pt-3">
        <div className="flex items-start justify-between">
          <h3 className="text-foreground line-clamp-1 text-base font-semibold">
            {product.name.charAt(0).toUpperCase() +
              product.name.slice(1).toLocaleLowerCase()}
          </h3>
        </div>
        <p className="text-muted-foreground mt-1 line-clamp-2 text-sm">
          {product.description}
        </p>
      </CardContent>

      <CardFooter className="flex items-center justify-between p-4 pt-0">
        <div className="flex flex-col">
          {product.discountPercentage && product.discountPercentage > 0 ? (
            <>
              <p className="text-primary dark:text-primary-foreground font-semibold">
                {formatCOP(
                  roundToHundredBelow(
                    (1 - product.discountPercentage / 100) * product.price,
                  ),
                )}
              </p>
              <p className="text-muted-foreground text-xs line-through">
                {formatCOP(product.price)}
              </p>
            </>
          ) : (
            <p className="text-primary dark:text-primary-foreground font-semibold">
              {formatCOP(product.price)}
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
          <Button
            asChild
            variant={inCart ? "outline" : "default"}
            size="sm"
            className={cn({
              "border-emerald-500 text-emerald-600 hover:bg-emerald-500/10 dark:border-emerald-400 dark:text-emerald-400 dark:hover:bg-emerald-400/10":
                inCart,
            })}
          >
            <Link href={`/products/${product.id}`}>
              {inCart ? "Ver detalles" : "Detalles"}
            </Link>
          </Button>
        )}
      </CardFooter>

      {/* Small dot indicator in corner when item is in cart */}
      {inCart && !outOfStock && (
        <div className="absolute top-0 left-0 m-2 h-3 w-3 rounded-full bg-emerald-500 shadow-sm dark:bg-emerald-400"></div>
      )}
    </Card>
  );
};

export default Product;
