import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export function SearchProducts() {
  return (
    <div className="relative mt-8 mb-8">
      <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
      <Input
        className="pl-10"
        placeholder="Search products..."
        defaultValue={""}
      />
    </div>
  );
}
