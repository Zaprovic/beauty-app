import React from "react";
import { Card, CardContent, CardFooter } from "./ui/card";
import Image from "next/image";
import { Badge } from "./ui/badge";
import Link from "next/link";
import { Button } from "./ui/button";
import { ProductType } from "@/types";

const Product = ({ product }: { product: ProductType }) => {
  return (
    <Card className="m-0 h-96 overflow-hidden p-0 transition-all hover:shadow-lg">
      <div className="relative h-full w-full overflow-hidden">
        <Image
          src={"/images/beauty-01.webp"}
          alt={product.name}
          fill
          className="object-cover"
        />
      </div>
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <h3 className="line-clamp-1 text-lg font-semibold">{product.name}</h3>
          <Badge variant="outline" className="bg-primary/10 text-primary">
            {product.category}
          </Badge>
        </div>
        <p className="text-muted-foreground mt-2 line-clamp-2 text-sm">
          {product.description}
        </p>
      </CardContent>
      <CardFooter className="flex justify-between p-4 pt-0">
        <p className="text-primary font-semibold">
          ${product.price.toFixed(2)}
        </p>
        <Button asChild variant="outline" size="sm">
          <Link href={`/products/${product.id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Product;
