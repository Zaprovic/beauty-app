import Link from "next/link";
import CarouselSellersSection from "./carousel-sellers-section";

const SellersSection = () => {
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

        <CarouselSellersSection />

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
