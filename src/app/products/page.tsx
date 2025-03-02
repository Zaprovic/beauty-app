import { db } from "@/db";
import { categories as categoriesTable } from "@/db/schema";
import { CategoryTabs } from "./_components/category-tabs";
import { Suspense } from "react";
// import { SearchProducts } from "./_components/search-products";
import { LoaderIcon } from "lucide-react";

export default async function ProductsPage() {
  const categories = await db.select().from(categoriesTable);

  return (
    <>
      <>
        <div className="container mx-auto my-17 max-w-7xl px-4 py-8">
          {/* <SearchProducts /> */}
          <Suspense
            fallback={
              <div className="flex flex-col items-center text-center">
                <LoaderIcon className="h-10 w-10 animate-spin" />
              </div>
            }
          >
            <CategoryTabs categories={categories} />
          </Suspense>
        </div>
      </>
    </>
  );
}
