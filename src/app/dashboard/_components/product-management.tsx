import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductStatsCards } from "./product-stats";
import { ProductTable } from "./product-table";
export const ProductManagement = () => {
  // const [products, setProducts] =
  //   useState<ProductWithCategoryType[]>(initialProducts);
  // const [open, setOpen] = useState(false);
  // const [currentProduct, setCurrentProduct] =
  //   useState<ProductWithCategoryType | null>(null);
  // const [isEditing, setIsEditing] = useState(false);

  // const handleAddProduct = () => {
  //   setCurrentProduct(null);
  //   setIsEditing(false);
  //   setOpen(true);
  // };

  // const handleEditProduct = (product: ProductWithCategoryType) => {
  //   setCurrentProduct(product);
  //   setIsEditing(true);
  //   setOpen(true);
  // };

  // const handleDeleteProduct = async (id: number) => {
  //   // In a real app, you would call an API to delete the product
  //   // For now just update the local state
  //   setProducts(products.filter((product) => product.id !== id));
  // };

  // const handleSaveProduct = async (product: ProductWithCategoryType) => {
  //   // In a real app, you would call an API to save the product
  //   if (isEditing && currentProduct) {
  //     setProducts(products.map((p) => (p.id === product.id ? product : p)));
  //   } else {
  //     // This is simplified - in a real app, you'd get the ID from the backend
  //     const newId = Math.max(...products.map((p) => p.id), 0) + 1;
  //     setProducts([...products, { ...product, id: newId }]);
  //   }
  //   setOpen(false);
  // };

  return (
    <>
      {/* Page header */}
      <div className="mb-4 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold -tracking-wider sm:text-3xl">
          Dashboard de productos
        </h1>
        <Button className="w-full sm:w-auto">
          <PlusCircle className="mr-2 h-4 w-4" />
          <span className="-tracking-wider whitespace-nowrap">
            Agregar nuevo producto
          </span>
        </Button>
      </div>

      <ProductStatsCards />
      <ProductTable />
      {/* <ProductDialog
        open={open}
        setOpen={setOpen}
        product={currentProduct}
        isEditing={isEditing}
        onSave={handleSaveProduct}
      /> */}
    </>
  );
};
