import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCOP } from "@/lib/utils";
import { getProductsWithCategories } from "@/lib/db";

export const ProductStatsCards = async () => {
  const products = await getProductsWithCategories();
  const totalProducts = products.length;
  const totalValue = products.reduce((sum, product) => sum + product.price, 0);
  const lowStock = 0; // Placeholder

  return (
    <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader className="pb-1 sm:pb-2">
          <CardTitle className="text-muted-foreground text-sm font-medium">
            Total Products
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold -tracking-wider sm:text-3xl">
            {totalProducts}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-1 sm:pb-2">
          <CardTitle className="text-muted-foreground text-sm font-medium">
            Inventory Value
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold -tracking-wider sm:text-3xl">
            {formatCOP(totalValue)}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-1 sm:pb-2">
          <CardTitle className="text-muted-foreground text-sm font-medium">
            Low Stock Items
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold sm:text-3xl">{lowStock}</div>
        </CardContent>
      </Card>
    </div>
  );
};
