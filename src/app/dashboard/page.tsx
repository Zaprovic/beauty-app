import { DashboardLayout } from "@/components/dashboard/layout";
import { ProductManagement } from "@/app/dashboard/_components/product-management";

export default async function DashboardPage() {
  return (
    <DashboardLayout>
      <ProductManagement />
    </DashboardLayout>
  );
}
