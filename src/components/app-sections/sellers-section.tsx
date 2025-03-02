"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { ExternalLinkIcon, HeartIcon, ShoppingCartIcon } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Card, CardHeader, CardFooter } from "../ui/card";
import Autoplay from "embla-carousel-autoplay";
import { ProductType } from "@/types";

const SellersSection = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBestSellers = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/products");

        if (!response.ok) {
          throw new Error("Error al obtener los más vendidos");
        }

        const data = await response.json();
        setProducts(data);
      } catch (err) {
        console.error("Error al obtener los más vendidos:", err);
        setError(
          "Error al cargar los productos. Por favor, inténtelo de nuevo más tarde.",
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchBestSellers();
  }, []);

  return (
    <section className="mx-auto border-b py-16">
      <div className="px-4">
        <h2 className="mb-4 text-center text-3xl font-bold -tracking-wider">
          Más Vendidos
        </h2>
        <p className="mb-12 text-center">Nuestros productos más queridos</p>

        {isLoading && (
          <div className="flex justify-center py-12">
            <div className="border-primary h-8 w-8 animate-spin rounded-full border-4 border-t-transparent"></div>
          </div>
        )}

        {error && (
          <div className="mx-auto max-w-md rounded-lg bg-red-50 p-4 text-center text-red-800">
            {error}
          </div>
        )}

        {!isLoading && !error && products.length === 0 && (
          <p className="py-8 text-center">
            No se encontraron productos más vendidos.
          </p>
        )}

        {!isLoading && !error && products.length > 0 && (
          <Carousel
            plugins={[Autoplay({ delay: 5000, stopOnInteraction: true })]}
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
                            // Funcionalidad para agregar al carrito aquí
                          }}
                        >
                          <span className="text-xs">Agregar</span>
                          <ShoppingCartIcon size={14} />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardFooter className="">
                      <Link
                        href={`/products/${product.id}`}
                        className="text-muted-foreground hover:text-primary flex w-full items-center gap-1 text-sm transition-colors"
                      >
                        <span>Ver detalles</span>
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
        )}

        <div className="mt-10 text-center">
          <Link
            href="/products"
            className="border-primary hover:bg-primary hover:text-primary-foreground inline-block rounded-full border bg-white px-6 py-2 transition"
          >
            Ver Todos los Productos
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SellersSection;
