import CarouselWrapper from "@/components/providers/carousel-wrapper";
import { CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { db } from "@/db";
import { categories as categoriesTable } from "@/db/schema";
import { CategoryCard } from "../category-card";

// Hash function to generate a consistent number from a string
const hashString = (str: string): number => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash);
};

const CategoriesSection = async () => {
  const categories = await db.select().from(categoriesTable);

  return (
    <section className="border-border mx-auto border-b py-16">
      <div className="px-4">
        <h2 className="mb-12 text-center text-3xl font-bold -tracking-wider">
          Comprar por Categoría
        </h2>

        <CarouselWrapper delay={4000}>
          <CarouselContent>
            {categories.map((category) => {
              // Generate a unique but consistent color index for this category
              const colorIndex = hashString(category.name);

              return (
                <CarouselItem
                  key={category.id}
                  className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                >
                  <CategoryCard category={category} colorIndex={colorIndex} />
                </CarouselItem>
              );
            })}
          </CarouselContent>
        </CarouselWrapper>
      </div>
    </section>
  );
};

export default CategoriesSection;
