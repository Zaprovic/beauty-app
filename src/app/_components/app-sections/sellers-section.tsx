import Link from "next/link";
import CarouselWrapper from "@/components/providers/carousel-wrapper";
import { CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Product from "@/components/product";
import { getProductsWithCategories } from "@/lib/db";

const SellersSection = async () => {
  const products = await getProductsWithCategories();

  return (
    <section className="mx-auto border-b py-16">
      <div className="px-4">
        <h2 className="mb-4 text-center text-3xl font-bold -tracking-wider">
          Nuestros productos
        </h2>
        <p className="mb-12 text-center">
          Descubre los productos de nuestra colección y encuentra lo que más te
          gusta.
        </p>

        <CarouselWrapper delay={5000}>
          <CarouselContent className="fade-in -ml-4">
            {products.map((product) => (
              <CarouselItem
                key={product.id}
                className="pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
              >
                <Product product={product} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </CarouselWrapper>

        <div className="mt-10 text-center">
          <Link
            href="/products"
            className="border-primary hover:bg-primary hover:text-primary-foreground inline-block rounded-full border px-6 py-2 transition"
          >
            Ver todos los productos
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SellersSection;
