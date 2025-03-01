"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { MenuIcon } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import Link from "next/link";
import CollapsibleSidebar, { SubcategoryItem } from "../collapsible-sidebar";

const skincareSubcategories: SubcategoryItem[] = [
  { name: "Cleansers", href: "#" },
  { name: "Serums", href: "#" },
  { name: "Moisturizers", href: "#" },
  { name: "Masks", href: "#" },
];

const makeupSubcategories: SubcategoryItem[] = [
  { name: "Face", href: "/category/face" },
  { name: "Eyes", href: "/category/eyes" },
  { name: "Lips", href: "/category/lips" },
  { name: "Brushes", href: "/category/brushes" },
];

const haircareSubcategories: SubcategoryItem[] = [
  { name: "Shampoo", href: "/category/shampoo" },
  { name: "Conditioner", href: "/category/conditioner" },
  { name: "Treatments", href: "/category/treatments" },
];

const SidebarToggle = () => {
  const [skinCareOpen, setSkinCareOpen] = useState(false);
  const [makeupOpen, setMakeupOpen] = useState(false);
  const [hairCareOpen, setHairCareOpen] = useState(false);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant={"ghost"}
          size={"icon"}
          className="size-7 cursor-pointer focus:outline-none md:hidden"
          aria-label="Toggle menu"
          asChild
        >
          <MenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent className="px-3 py-6">
        <SheetHeader className="mb-6 p-0">
          <SheetTitle className="text-3xl font-bold -tracking-wider">
            Beauty Shop
          </SheetTitle>
        </SheetHeader>

        <div className="flex h-full flex-col">
          <div className="flex-1">
            <div className="flex flex-col">
              <div className="flex w-full flex-col gap-2">
                <CollapsibleSidebar
                  title="Skincare"
                  isOpen={skinCareOpen}
                  onOpenChange={setSkinCareOpen}
                  subcategories={skincareSubcategories}
                />
                <CollapsibleSidebar
                  title="Makeup"
                  isOpen={makeupOpen}
                  onOpenChange={setMakeupOpen}
                  subcategories={makeupSubcategories}
                />
                <CollapsibleSidebar
                  title="Hair Care"
                  isOpen={hairCareOpen}
                  onOpenChange={setHairCareOpen}
                  subcategories={haircareSubcategories}
                />
              </div>

              <div className="pt-4">
                <Link
                  href="/new-arrivals"
                  className="block font-medium hover:underline"
                >
                  New Arrivals
                </Link>
                <Link
                  href="/bestsellers"
                  className="mt-2 block font-medium hover:underline"
                >
                  Bestsellers
                </Link>
                <Link
                  href="/sale"
                  className="mt-2 block font-medium hover:underline"
                >
                  Sale
                </Link>
              </div>
            </div>

            <div className="mt-8 border-t pt-4">
              <Link href="/account" className="block">
                My Account
              </Link>
              <Link href="/wishlist" className="mt-2 block">
                Wishlist
              </Link>
              <Link href="/cart" className="mt-2 block">
                Shopping Cart
              </Link>
            </div>
          </div>

          <SheetClose asChild className="h-full hover:cursor-pointer">
            <Button variant="outline" className="h-fit w-full">
              Close Menu
            </Button>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SidebarToggle;
