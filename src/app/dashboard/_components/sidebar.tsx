"use client";

import { LayoutDashboard, ShoppingBag, Users, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DashboardSidebarProps {
  onCloseMobile?: () => void;
}

export function DashboardSidebar({ onCloseMobile }: DashboardSidebarProps) {
  const handleNavClick = () => {
    if (onCloseMobile) {
      onCloseMobile();
    }
  };

  return (
    <div className="flex h-full w-64 flex-col p-6">
      <h2 className="mb-10 text-center text-xl font-bold md:block">
        Beauty Admin
      </h2>

      <div className="space-y-2">
        <Button
          variant="ghost"
          className="w-full justify-start"
          size="sm"
          onClick={handleNavClick}
        >
          <LayoutDashboard className="mr-2 h-4 w-4" />
          Dashboard
        </Button>
        <Button
          variant="secondary"
          className="w-full justify-start"
          size="sm"
          onClick={handleNavClick}
        >
          <ShoppingBag className="mr-2 h-4 w-4" />
          Products
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start"
          size="sm"
          onClick={handleNavClick}
        >
          <Users className="mr-2 h-4 w-4" />
          Customers
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start"
          size="sm"
          onClick={handleNavClick}
        >
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </Button>
      </div>
    </div>
  );
}
