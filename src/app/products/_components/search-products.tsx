"use client";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import { useSearchProductStore } from "@/stores/search-product-store";

export function SearchProducts() {
  const [inputValue, setInputValue] = useState("");
  const { setQuery } = useSearchProductStore();

  const [debouncedSetQuery] = useDebounce((value: string) => {
    setQuery(value);
  }, 300);

  return (
    <div className="fixed top-17 right-0 left-0 z-50 w-full border-b px-6 py-4 backdrop-blur-sm transition-all duration-300 sm:px-8">
      <div className="relative mx-auto flex max-w-7xl items-center justify-between">
        <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
        <Input
          className="pl-10"
          placeholder="Buscar productos..."
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            debouncedSetQuery(e.target.value);
          }}
        />
      </div>
    </div>
  );
}
