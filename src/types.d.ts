import { categories, products } from "./db/schema";

// export type ProductType = {
//   id: number;
//   name: string;
//   price: number;
//   category: string;
//   image: string;
//   description: string;
//   rating?: number;
//   reviewCount?: number;
//   benefits?: string[];
//   howToUse?: string;
//   ingredients?: string;
//   images?: string[];
//   inStock?: boolean;
// };

export type ProductType = typeof products.$inferSelect;

export type CategoryType = typeof categories.$inferSelect;
