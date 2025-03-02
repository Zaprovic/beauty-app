"use client";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "../ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const CategoriesSection = () => {
  return (
    <section className="mx-auto border-b py-16">
      <div className="px-4">
        <h2 className="mb-12 text-center text-3xl font-bold -tracking-wider">
          Comprar por Categoría
        </h2>
        <Carousel
          plugins={[
            Autoplay({
              delay: 4000,
            }),
          ]}
          className="mx-auto max-w-5xl"
        >
          <CarouselContent className="">
            {[
              "Skincare",
              "Makeup",
              "Haircare",
              "Sun Protection",
              "Kids",
              "Pills",
            ].map((category) => (
              <CarouselItem
                key={category}
                className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
              >
                <Link
                  href={`/category/${category.toLowerCase().replace(/ /g, "-")}`}
                  className="group"
                >
                  <div className="relative h-64 overflow-hidden rounded-lg">
                    <div className="absolute inset-0">
                      <Image
                        src={`/images/${category.toLocaleLowerCase()}.jpg`}
                        className="object-cover"
                        alt={category}
                        fill
                      />
                      <div className="flex h-full w-full items-center justify-center">
                        Imagen: {category}
                      </div>
                    </div>
                    <div className="bg-opacity-20 group-hover:bg-opacity-30 absolute inset-0 flex items-end transition">
                      <div className="bg-opacity-90 w-full translate-y-0 transform px-3 py-4 transition group-hover:translate-y-0">
                        <Badge variant={"secondary"}>{category}</Badge>
                      </div>
                    </div>
                  </div>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute hidden sm:flex sm:items-center sm:justify-center" />
          <CarouselNext className="absolute hidden sm:flex sm:items-center sm:justify-center" />
        </Carousel>
      </div>
    </section>
  );
};

export default CategoriesSection;
