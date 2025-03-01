export type ProductType = {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;

  rating?: number;
  reviewCount?: number;
  benefits?: string[];
  howToUse?: string;
  ingredients?: string;
  images?: string[];
  inStock?: boolean;
};
