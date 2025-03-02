import { relations } from "drizzle-orm";
import {
  pgTable,
  serial,
  text,
  real,
  boolean,
  integer,
  primaryKey,
} from "drizzle-orm/pg-core";

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  price: real("price").notNull(),
  brand: text("brand").notNull(),
  mainImage: text("image").notNull(),
  description: text("description").notNull(),

  discountPercentage: real("discount_percentage").default(0),
  images: text("images").array().default([]),

  benefits: text("benefits").array().default([]),
  howToUse: text("how_to_use"),
  ingredients: text("ingredients").array().default([]),

  inStock: boolean("in_stock").default(true),

  createdAt: text("created_at").default(new Date().toISOString()),
  updatedAt: text("updated_at").default(new Date().toISOString()),
});

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  isActive: boolean("is_active").default(true),
});

export const productCategories = pgTable(
  "product_categories",
  {
    productId: integer("product_id")
      .notNull()
      .references(() => products.id, { onDelete: "cascade" }),

    categorieId: integer("category_id")
      .notNull()
      .references(() => categories.id, { onDelete: "cascade" }),
  },
  (t) => [primaryKey({ columns: [t.productId, t.categorieId] })],
);

export const productsRelations = relations(products, ({ many }) => ({
  productCategories: many(productCategories),
}));

export const categoriesRelations = relations(categories, ({ many }) => ({
  productCategories: many(productCategories),
}));

export const productCategoriesRelations = relations(
  productCategories,
  ({ one }) => ({
    categories: one(categories, {
      fields: [productCategories.categorieId],
      references: [categories.id],
    }),
    products: one(products, {
      fields: [productCategories.productId],
      references: [products.id],
    }),
  }),
);
