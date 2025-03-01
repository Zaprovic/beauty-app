"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { HeartIcon, ShoppingCartIcon } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Card, CardContent, CardHeader } from "../ui/card";
import Autoplay from "embla-carousel-autoplay";

const SellersSection = () => {
  return (
    <section className="mx-auto border-b py-16">
      <div className="px-4">
        <h2 className="mb-4 text-center text-3xl font-bold -tracking-wider">
          Best Sellers
        </h2>
        <p className="mb-12 text-center">Our most loved products</p>
        <Carousel
          plugins={[Autoplay({ delay: 5000, stopOnInteraction: true })]}
          className="mx-auto max-w-5xl"
        >
          <CarouselContent className="w-full">
            {Array.from({ length: 10 }).map((item) => (
              <CarouselItem
                key={crypto.randomUUID()}
                className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
              >
                <Card className="h-96 overflow-hidden p-0 pb-4 shadow-none">
                  <CardContent className="relative h-full">
                    <Image
                      src={"/images/beauty-01.webp"}
                      alt="Product Image"
                      fill
                      className="object-cover"
                    />
                    <div className="flex h-full w-full items-center justify-center">
                      Product Image {item as number}
                    </div>
                    <div className="absolute top-3 right-3">
                      <Button
                        variant={"secondary"}
                        size={"icon"}
                        className="flex h-8 w-8 items-center justify-center rounded-full shadow"
                      >
                        <HeartIcon />
                      </Button>
                    </div>
                  </CardContent>
                  <CardHeader>
                    <h3 className="mb-1 font-medium">
                      Product Name {item as number}
                    </h3>
                    <p className="mb-2 text-sm">Short product description</p>
                    <div className="flex items-center justify-between">
                      <span className="font-medium">$24.99</span>
                      <Button
                        variant={"outline"}
                        className="hover:bg-primary/95 hover:text-primary-foreground rounded-full px-3 py-1 text-sm transition hover:cursor-pointer"
                      >
                        <span>Add to cart</span>
                        <ShoppingCartIcon />
                      </Button>
                    </div>
                  </CardHeader>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute hidden sm:flex sm:items-center sm:justify-center" />
          <CarouselNext className="absolute hidden sm:flex sm:items-center sm:justify-center" />
        </Carousel>
        <div className="mt-10 text-center">
          <Link
            href="/products"
            className="inline-block rounded-full border px-6 py-2 transition"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SellersSection;
