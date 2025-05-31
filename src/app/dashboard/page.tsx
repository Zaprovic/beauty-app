import { ProductManagement } from "@/app/dashboard/_components/product-management";

export default async function DashboardPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
      <ProductManagement />
    </div>
  );
}
