import { ShoppingCart, Heart, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ProductTabs from "./_components/product-tabs";
import ProductImages from "./_components/product-images";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { getProductsWithCategories, getProductWithCategory } from "@/lib/db";

export async function generateStaticParams() {
  const products = await getProductsWithCategories();

  return products.map((p) => ({
    id: p.id.toString(),
  }));
}

// Function to round price to nearest hundred below
const roundToHundredBelow = (price: number) => {
  return Math.floor(price / 100) * 100;
};

// Convert to a server component by removing "use client"
export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // Fetch the product data server-side
  const { id } = await params;
  const product = await getProductWithCategory(id);

  if (!product) {
    return (
      <div className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center px-4 py-16">
        <div className="flex flex-col items-center">
          <ShoppingCart size={150} className="mb-4" />
          <h1 className="mb-4 text-2xl font-bold -tracking-wider">
            Producto no encontrado
          </h1>
          <p className="mb-6">
            Lo sentimos, el producto que estás buscando no existe o no está
            disponible.
          </p>
          <Button asChild variant={"outline"}>
            <Link
              href={"/products"}
              className="hover:text-primary flex items-center transition-colors"
            >
              <ArrowLeft size={16} className="mr-2" />
              Volver a productos
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="fade-in container mx-auto max-w-7xl px-4 py-8 md:py-12">
      {/* Breadcrumbs */}
      <Breadcrumb>
        <BreadcrumbList className="mb-6 flex items-center text-sm">
          <BreadcrumbItem>
            <Button asChild variant={"outline"}>
              <BreadcrumbLink
                href={"/"}
                className="hover:text-primary transition-colors"
              >
                Inicio
              </BreadcrumbLink>
            </Button>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <Button asChild variant={"outline"}>
              <BreadcrumbLink
                href={"/products"}
                className="hover:text-primary transition-colors"
              >
                Productos
              </BreadcrumbLink>
            </Button>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem className="font-medium">
            {product.name}
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Product Images */}
        <ProductImages product={product} />

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            {/* Display all categories as badges */}
            <div className="mb-3 flex flex-wrap gap-2">
              {product.categories.map((category) => (
                <span
                  key={category.id}
                  className="text-primary bg-primary/10 inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium"
                >
                  {category.name}
                </span>
              ))}
            </div>

            <h1 className="mt-1 text-3xl font-bold -tracking-wider text-balance md:text-4xl">
              {product.name}
            </h1>

            {/* Display both original and discounted price if there's a discount */}
            {product.discountPercentage && product.discountPercentage > 0 ? (
              <div className="mt-4 flex items-center gap-2">
                <p className="text-primary text-2xl font-bold md:text-3xl">
                  $
                  {new Intl.NumberFormat("es-CO").format(
                    roundToHundredBelow(
                      product.price * (1 - product.discountPercentage / 100),
                    ),
                  )}
                </p>
                <p className="text-lg text-gray-500 line-through">
                  ${new Intl.NumberFormat("es-CO").format(product.price)}
                </p>
                <span className="ml-2 rounded bg-rose-500 px-2 py-1 text-xs font-bold text-white">
                  {product.discountPercentage}% DCTO
                </span>
              </div>
            ) : (
              <p className="mt-4 text-2xl font-bold md:text-3xl">
                ${new Intl.NumberFormat("es-CO").format(product.price)}
              </p>
            )}
          </div>

          <div className="border-t pt-4">
            <p className="line-clamp-10 leading-relaxed -tracking-wider text-pretty">
              {product.description}
            </p>
          </div>

          <div className="flex items-center space-x-2 pt-4">
            <div className="h-3 w-3 rounded-full bg-emerald-500"></div>
            <p className="text-sm font-medium">
              {product.inStock ? "En Stock" : "Agotado"}
            </p>
          </div>

          <div className="flex flex-col gap-4 pt-6 sm:flex-row">
            <Button className="bg-primary hover:bg-primary/90 flex flex-1 items-center justify-center gap-2 rounded-md px-6 py-3 font-medium transition-colors">
              <ShoppingCart size={18} />
              Añadir al Carrito
            </Button>
            <Button className="flex flex-1 items-center justify-center gap-2 rounded-md border px-6 py-3 font-medium transition-colors sm:flex-none">
              <Heart size={18} />
              Añadir a Favoritos
            </Button>
          </div>
        </div>
      </div>

      {/* Detailed Information Tabs */}
      <ProductTabs product={product} />
    </div>
  );
}
