import React from "react";
import { Card, CardContent, CardFooter } from "./ui/card";
import Image from "next/image";
import { Badge } from "./ui/badge";
import Link from "next/link";
import { Button } from "./ui/button";
import { ProductType } from "@/types";
import { HeartIcon } from "lucide-react";

type props = ProductType & {
  categoryName: string;
};

const Product = async ({ product }: { product: props }) => {
  return (
    <Card className="relative m-0 h-96 overflow-hidden p-0 transition-all hover:shadow-lg">
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
          <Badge
            variant="outline"
            className="bg-primary/10 text-primary absolute top-48 right-2"
          >
            {product.categoryName}
          </Badge>
        </div>
        <p className="text-muted-foreground mt-2 line-clamp-2 text-sm">
          {product.description}
        </p>
      </CardContent>
      <CardFooter className="flex justify-between p-4 pt-0">
        <p className="text-primary text-sm font-semibold">
          {new Intl.NumberFormat("es-CO", {
            style: "currency",
            currency: "COP",
          }).format(product.price)}
        </p>
        <Button asChild variant="outline" size="sm">
          <Link href={`/products/${product.id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Product;
