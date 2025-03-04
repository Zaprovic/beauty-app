import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export function SearchProducts() {
  return (
    <div className="fixed top-17 right-0 left-0 z-50 w-full border-b px-6 py-4 backdrop-blur-sm transition-all duration-300 sm:px-8">
      <div className="relative mx-auto flex max-w-7xl items-center justify-between">
        <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
        <Input
          className="pl-10"
          placeholder="Buscar productos..."
          defaultValue={""}
        />
      </div>
    </div>
  );
}
