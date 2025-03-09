import CarouselWrapper from "@/components/providers/carousel-wrapper";
import { CarouselContent, CarouselItem } from "@/components/ui/carousel";
import ProductClientWrapper from "./product-client-wrapper";
import { getProductsWithCategories } from "@/lib/db";

const CarouselSellersSection = async () => {
  const products = await getProductsWithCategories();
  return (
    <CarouselWrapper delay={5000}>
      <CarouselContent className="fade-in -ml-4">
        {products.map((product) => (
          <CarouselItem
            key={product.id}
            className="pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
          >
            <ProductClientWrapper product={product} />
          </CarouselItem>
        ))}
      </CarouselContent>
    </CarouselWrapper>
  );
};

export default CarouselSellersSection;
