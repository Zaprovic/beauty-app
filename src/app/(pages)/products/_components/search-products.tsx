"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

type SearchProducts = {
  onSearch: (query: string) => void;
  initialQuery?: string;
};

export function SearchProducts({
  onSearch,
  initialQuery = "",
}: SearchProducts) {
  const [searchQuery, setSearchQuery] = useState(initialQuery);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setSearchQuery(newQuery);
    onSearch(newQuery);
  };

  return (
    <div className="relative mt-8 mb-8">
      <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
      <Input
        className="pl-10"
        placeholder="Search products..."
        value={searchQuery}
        onChange={handleSearchChange}
      />
    </div>
  );
}
