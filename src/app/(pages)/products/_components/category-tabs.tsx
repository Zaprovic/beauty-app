"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export type ProductCategory = {
  id: string;
  label: string;
};

type CategoryTabsProps = {
  categories: ProductCategory[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
};

export function CategoryTabs({
  categories,
  activeCategory,
  onCategoryChange,
}: CategoryTabsProps) {
  return (
    <Tabs
      defaultValue={activeCategory}
      value={activeCategory}
      onValueChange={onCategoryChange}
      className="mb-8"
    >
      <TabsList className="flex h-auto w-full flex-wrap gap-2">
        {categories.map((cat) => (
          <TabsTrigger
            key={cat.id}
            value={cat.id}
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground flex-grow"
          >
            {cat.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
