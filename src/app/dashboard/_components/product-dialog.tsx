"use client";

import { useState, useEffect } from "react";
import { type ProductWithCategoryType } from "@/types";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ProductDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  product: ProductWithCategoryType | null;
  isEditing: boolean;
  onSave: (product: ProductWithCategoryType) => void;
}

export function ProductDialog({
  open,
  setOpen,
  product,
  isEditing,
  onSave,
}: ProductDialogProps) {
  const [formValues, setFormValues] = useState({
    id: 0,
    name: "",
    categoryId: "",
    price: 0,
    categories: [] as { id: number; name: string }[],
  });

  // Reset form when product changes
  useEffect(() => {
    if (product) {
      setFormValues({
        id: product.id,
        name: product.name,
        categoryId: product.categories?.[0]?.id.toString() || "",
        price: product.price,
        categories: product.categories || [],
      });
    } else {
      setFormValues({
        id: 0,
        name: "",
        categoryId: "",
        price: 0,
        categories: [],
      });
    }
  }, [product, open]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: name === "price" ? parseFloat(value) : value,
    });
  };

  const handleCategoryChange = (value: string) => {
    setFormValues({
      ...formValues,
      categoryId: value,
    });
  };

  const handleSubmit = () => {
    // Create a product object from the form values
    const updatedProduct: ProductWithCategoryType = {
      id: formValues.id,
      name: formValues.name,
      price: formValues.price,
      brand: "",
      mainImage: "",
      description: "",
      discountPercentage: null,
      images: null,
      benefits: null,
      howToUse: null,
      ingredients: null,
      inStock: true,
      createdAt: null,
      updatedAt: null,
      categories: [
        {
          id: parseInt(formValues.categoryId),
          name: "Category Name",
          isActive: true,
        },
      ],
    };

    onSave(updatedProduct);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-[95vw] sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Edit Product" : "Add New Product"}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Make changes to the product details."
              : "Add details for your new product."}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Product Name</Label>
            <Input
              id="name"
              name="name"
              value={formValues.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="category">Category</Label>
            <Select
              value={formValues.categoryId}
              onValueChange={handleCategoryChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Skincare</SelectItem>
                <SelectItem value="2">Makeup</SelectItem>
                <SelectItem value="3">Hair Care</SelectItem>
                <SelectItem value="4">Fragrance</SelectItem>
                <SelectItem value="5">Body Care</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="price">Price</Label>
            <div className="relative">
              <span className="absolute top-1/2 left-2 -translate-y-1/2 text-gray-500">
                $
              </span>
              <Input
                id="price"
                name="price"
                type="number"
                className="pl-6"
                value={formValues.price}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
        <DialogFooter className="flex-col gap-3 sm:flex-row">
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            className="w-full sm:w-auto"
          >
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="w-full sm:w-auto">
            {isEditing ? "Update" : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
