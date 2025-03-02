import Link from "next/link";
import CarouselWrapper from "../providers/carousel-wrapper";
import { db } from "@/db";
import { products as productsTable } from "@/db/schema";

const SellersSection = async () => {
  const products = await db.select().from(productsTable);

  return (
    <section className="mx-auto border-b py-16">
      <div className="px-4">
        <h2 className="mb-4 text-center text-3xl font-bold -tracking-wider">
          Más vendidos
        </h2>
        <p className="mb-12 text-center">Nuestros productos más populares</p>

        <CarouselWrapper products={products} delay={5000} />

        <div className="mt-10 text-center">
          <Link
            href="/products"
            className="border-primary hover:bg-primary hover:text-primary-foreground inline-block rounded-full border bg-white px-6 py-2 transition"
          >
            Ver todos los productos
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SellersSection;
