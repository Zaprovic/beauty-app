/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { Button } from "@/components/ui/button";

export function SearchProducts() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");

  // Debounce the search to avoid too many URL updates
  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (term) {
      params.set("q", term);
    } else {
      params.delete("q");
    }

    router.push(`/products?${params.toString()}`, { scroll: false });
  }, 500); // Increased debounce time to reduce page rerenders

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setQuery(value); // This updates the UI immediately
    handleSearch(value); // This will update the URL after the debounce period
  };

  const clearSearch = () => {
    setQuery("");
    handleSearch("");
  };

  // Only sync from URL params to input when URL changes, but not when typing
  useEffect(() => {
    const currentQuery = searchParams.get("q") || "";
    // Only update if the URL param doesn't match our current state
    // and we're not actively typing (which would be handled by handleInputChange)
    if (currentQuery !== query) {
      setQuery(currentQuery);
    }
  }, [searchParams]); // Removed query from dependencies

  return (
    <div className="fixed top-17 right-0 left-0 z-50 w-full border-b px-6 py-4 backdrop-blur-sm transition-all duration-300 sm:px-8">
      <div className="relative mx-auto flex max-w-7xl items-center justify-between">
        <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
        <Input
          className="pr-10 pl-10"
          placeholder="Buscar productos..."
          onChange={handleInputChange}
          value={query}
        />
        {query && (
          <Button
            onClick={clearSearch}
            className="text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2"
            aria-label="Clear search"
            variant="ghost"
            size="icon"
            asChild
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
