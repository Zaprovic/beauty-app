import { db } from "@/db";
import {
  products as productsTable,
  categories as categoriesTable,
  productCategories as productCategoriesTable,
} from "@/db/schema";
import { eq } from "drizzle-orm";

export const getProductsWithCategories = async () => {
  const products = await db
    .select({
      id: productsTable.id,
      name: productsTable.name,
      price: productsTable.price,
      brand: productsTable.brand,
      mainImage: productsTable.mainImage,
      createdAt: productsTable.createdAt,
      updatedAt: productsTable.updatedAt,
      description: productsTable.description,
      images: productsTable.images,
      benefits: productsTable.benefits,
      howToUse: productsTable.howToUse,
      ingredients: productsTable.ingredients,
      inStock: productsTable.inStock,
      discountPercentage: productsTable.discountPercentage,
    })
    .from(productsTable);

  // For each product, get all associated categories
  const productsWithCategories = await Promise.all(
    products.map(async (product) => {
      const categories = await db
        .select({
          id: categoriesTable.id,
          name: categoriesTable.name,
          isActive: categoriesTable.isActive,
        })
        .from(productCategoriesTable)
        .innerJoin(
          categoriesTable,
          eq(categoriesTable.id, productCategoriesTable.categorieId),
        )
        .where(eq(productCategoriesTable.productId, product.id));

      // Calculate the final price directly with the product data

      return {
        ...product,
        categories: categories,
      };
    }),
  );

  return productsWithCategories;
};

export const getProductWithCategory = async (id: string) => {
  // First get the product details
  const product = await db
    .select({
      id: productsTable.id,
      name: productsTable.name,
      price: productsTable.price,
      brand: productsTable.brand,
      mainImage: productsTable.mainImage,
      createdAt: productsTable.createdAt,
      updatedAt: productsTable.updatedAt,
      description: productsTable.description,
      images: productsTable.images,
      benefits: productsTable.benefits,
      howToUse: productsTable.howToUse,
      ingredients: productsTable.ingredients,
      inStock: productsTable.inStock,
      discountPercentage: productsTable.discountPercentage,
    })
    .from(productsTable)
    .where(eq(productsTable.id, Number(id)));

  if (!product.length) {
    return null;
  }

  // Then get all categories for this product
  const categories = await db
    .select({
      id: categoriesTable.id,
      name: categoriesTable.name,
      isActive: categoriesTable.isActive,
    })
    .from(productCategoriesTable)
    .innerJoin(
      categoriesTable,
      eq(categoriesTable.id, productCategoriesTable.categorieId),
    )
    .where(eq(productCategoriesTable.productId, Number(id)));

  // Calculate final price with the correct method

  // Combine the product with its categories
  return {
    ...product[0],
    categories: categories,
  };
};
