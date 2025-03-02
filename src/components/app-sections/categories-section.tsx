"use client";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useEffect, useState } from "react";
import { Skeleton } from "../ui/skeleton";
import { CategoryType } from "@/types";
import { useTheme } from "next-themes";

function generateCategoryColor(
  name: string,
  isDarkMode: boolean,
): {
  bg: string;
  text: string;
  accent: string;
} {
  // Hash the name to generate a predictable number
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }

  // Use the hash to generate a hue (0-360)
  const hue = hash % 360;

  if (isDarkMode) {
    // Dark mode palette - dimmed tones
    return {
      bg: `hsl(${hue}, 50%, 15%)`, // Darker, dimmed background
      text: `hsl(${hue}, 80%, 85%)`, // Dimmed text for dark backgrounds
      accent: `hsl(${hue}, 80%, 45%)`, // Dimmed accent for dark mode
    };
  } else {
    // Light mode palette - dimmed tones
    return {
      bg: `hsl(${hue}, 50%, 85%)`, // Light, dimmed background
      text: `hsl(${hue}, 80%, 35%)`, // Dimmed text color
      accent: `hsl(${hue}, 80%, 45%)`, // Dimmed accent
    };
  }
}

const CategoriesSection = () => {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // After mounting, we know we can access the theme
  useEffect(() => {
    setMounted(true);
  }, []);

  const isDarkMode = mounted && theme === "dark";

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/categories");

        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }

        const data = await response.json();
        setCategories(data);
      } catch (err) {
        setError("Error loading categories. Please try again later.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (error) {
    return (
      <section className="border-border mx-auto border-b py-16">
        <div className="px-4 text-center">
          <h2 className="mb-12 text-center text-3xl font-bold -tracking-wider">
            Comprar por Categoría
          </h2>
          <p className="text-red-500">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="border-border mx-auto border-b py-16">
      <div className="px-4">
        <h2 className="mb-12 text-center text-3xl font-bold -tracking-wider">
          Comprar por Categoría
        </h2>
        {isLoading ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[1, 2, 3, 4].map((item) => (
              <Skeleton key={item} className="h-64 rounded-lg" />
            ))}
          </div>
        ) : (
          <Carousel
            plugins={[
              Autoplay({
                delay: 4000,
              }),
            ]}
            className="mx-auto max-w-5xl"
          >
            <CarouselContent>
              {categories.map((category) => {
                const colors = generateCategoryColor(category.name, isDarkMode);

                return (
                  <CarouselItem
                    key={category.id}
                    className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                  >
                    <Link href={`/category/${category.name}`} className="group">
                      <div
                        className="relative h-64 overflow-hidden rounded-xl shadow-md transition-all duration-300 ease-in-out group-hover:scale-[1.02] hover:shadow-lg"
                        style={{ backgroundColor: colors.bg }}
                      >
                        {/* Circle background for the letter */}
                        <div
                          className="absolute top-6 left-1/2 flex h-16 w-16 -translate-x-1/2 items-center justify-center rounded-full text-2xl font-bold transition-transform duration-300 group-hover:scale-110"
                          style={{
                            backgroundColor: colors.accent,
                            color: isDarkMode ? "hsl(0, 0%, 10%)" : "white",
                          }}
                        >
                          {category.name.charAt(0).toUpperCase()}
                        </div>

                        {/* Category name */}
                        <div className="absolute bottom-12 left-0 w-full text-center">
                          <h3
                            className="px-4 text-xl font-semibold transition-all duration-300 group-hover:translate-y-[-5px]"
                            style={{ color: colors.text }}
                          >
                            {category.name}
                          </h3>
                        </div>

                        {/* Bottom badge */}
                        <div
                          className="group-hover:bg-opacity-95 absolute right-0 bottom-0 left-0 overflow-hidden rounded-b-xl py-3 text-center transition-all duration-300"
                          style={{
                            backgroundColor: colors.accent,
                            opacity: 0.9,
                          }}
                        >
                          <span
                            className="text-sm font-medium"
                            style={{
                              color: isDarkMode ? "hsl(0, 0%, 10%)" : "white",
                            }}
                          >
                            Ver productos
                          </span>
                        </div>

                        {/* Decorative elements */}
                        <div
                          className="absolute -top-6 -right-6 h-16 w-16 rounded-full opacity-30"
                          style={{ backgroundColor: colors.accent }}
                        ></div>
                        <div
                          className="absolute bottom-20 -left-4 h-8 w-8 rounded-full opacity-20"
                          style={{ backgroundColor: colors.text }}
                        ></div>
                      </div>
                    </Link>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <div className="mt-8 flex items-center justify-center gap-2">
              <CarouselPrevious className="static mx-1 transform-none" />
              <CarouselNext className="static mx-1 transform-none" />
            </div>
          </Carousel>
        )}
      </div>
    </section>
  );
};

export default CategoriesSection;
