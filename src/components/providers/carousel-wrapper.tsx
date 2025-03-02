"use client";

import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { ProductType } from "@/types";
import Image from "next/image";
import { ExternalLinkIcon, HeartIcon, ShoppingCartIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardFooter, CardHeader } from "../ui/card";
import Link from "next/link";

type props = {
  delay: number;
  products: ProductType[];
};

const CarouselWrapper = ({ delay, products }: props) => {
  return (
    <Carousel
      plugins={[Autoplay({ delay, stopOnInteraction: true })]}
      className="mx-auto max-w-5xl"
      opts={{
        align: "start",
        loop: true,
      }}
    >
      <CarouselContent className="fade-in -ml-4">
        {products.map((product) => (
          <CarouselItem
            key={product.id}
            className="pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
          >
            <Card className="flex flex-col overflow-hidden border shadow-sm transition-all duration-200 hover:shadow-md">
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={product.mainImage || "/images/beauty-01.webp"}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-300 hover:scale-105"
                  priority
                />
                <div className="absolute top-3 right-3 flex gap-2">
                  <Button
                    variant={"secondary"}
                    size={"icon"}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-white/80 shadow backdrop-blur-sm hover:bg-white"
                  >
                    <HeartIcon size={16} />
                  </Button>
                </div>
              </div>
              <CardHeader className="px-4 py-2">
                <Link href={`/products/${product.id}`} className="group">
                  <h3 className="group-hover:text-primary line-clamp-1 font-medium">
                    {product.name}
                  </h3>
                </Link>
                <p className="text-muted-foreground mb-1 line-clamp-1 text-sm">
                  {product.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-primary font-medium">
                    {new Intl.NumberFormat("es-CO", {
                      style: "currency",
                      currency: "COP",
                    }).format(product.price)}
                  </span>
                  <Button
                    variant={"outline"}
                    size={"sm"}
                    className="hover:bg-primary hover:text-primary-foreground gap-1 rounded-full transition"
                    onClick={(e) => {
                      e.preventDefault();
                      // Add to cart functionality here
                    }}
                  >
                    <span className="text-xs">Add</span>
                    <ShoppingCartIcon size={14} />
                  </Button>
                </div>
              </CardHeader>
              <CardFooter className="">
                <Link
                  href={`/products/${product.id}`}
                  className="text-muted-foreground hover:text-primary flex w-full items-center gap-1 text-sm transition-colors"
                >
                  <span>View details</span>
                  <ExternalLinkIcon size={14} className="inline" />
                </Link>
              </CardFooter>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="mt-8 flex items-center justify-center gap-2">
        <CarouselPrevious className="static mx-1 transform-none" />
        <CarouselNext className="static mx-1 transform-none" />
      </div>
    </Carousel>
  );
};

export default CarouselWrapper;
