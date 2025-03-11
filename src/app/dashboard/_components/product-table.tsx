import { columns } from "./data-table/columns";
import { DataTable } from "./data-table/data-table";
import { getProductsWithCategories } from "@/lib/db";

export const ProductTable = async () => {
  const data = await getProductsWithCategories();
  return <DataTable columns={columns} data={data} />;
};
