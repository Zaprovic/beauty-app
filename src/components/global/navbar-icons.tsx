"use client";
import React from "react";
import { Button } from "../ui/button";
import { SearchIcon, ShoppingBagIcon, UserIcon } from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "./mode-toggle";
import { useCartStore } from "@/stores/cart-store";

const NavbarIcons = () => {
  const { items } = useCartStore();
  return (
    <div className="flex items-center gap-4">
      <Button
        className="size-5 focus:outline-none"
        aria-label="Search"
        variant={"ghost"}
        size={"icon"}
        asChild
        title="Search"
      >
        <SearchIcon />
      </Button>

      <Link href="/dashboard" aria-label="Account" title="Account">
        <UserIcon size={20} />
      </Link>

      <Link href="/cart" className="relative" aria-label="Cart" title="Cart">
        <ShoppingBagIcon size={20} />
        {items.length > 0 ? (
          <span className="bg-primary text-primary-foreground absolute bottom-3 left-2.5 flex aspect-square h-auto w-4 items-center justify-center rounded-full text-[0.625rem]">
            {items.length}
          </span>
        ) : (
          <span className="bg-primary text-primary-foreground absolute bottom-3 left-2.5 flex aspect-square h-auto w-4 items-center justify-center rounded-full text-[0.625rem]">
            0
          </span>
        )}
      </Link>
      <ModeToggle />
    </div>
  );
};

export default NavbarIcons;
