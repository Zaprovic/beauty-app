"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ProductType } from "@/types";

export default function ProductTabs({ product }: { product: ProductType }) {
  const [activeTab, setActiveTab] = useState("description");

  return (
    <div className="border-t pt-8">
      <div className="flex gap-x-4">
        <Button
          variant={activeTab === "description" ? "default" : "outline"}
          onClick={() => setActiveTab("description")}
        >
          Description
        </Button>
        <Button
          variant={activeTab === "howToUse" ? "default" : "outline"}
          onClick={() => setActiveTab("howToUse")}
        >
          How to Use
        </Button>
        <Button
          variant={activeTab === "ingredients" ? "default" : "outline"}
          onClick={() => setActiveTab("ingredients")}
        >
          Ingredients
        </Button>
      </div>

      <div className="py-6">
        {activeTab === "description" && (
          <div className="prose max-w-none">
            <p className="mb-6">{product.description}</p>
            <h3 className="mb-3 text-lg font-medium">Benefits</h3>
            <ul className="list-disc space-y-2 pl-5">
              {product.benefits?.map((benefit: string, index: number) => (
                <li key={index} className="">
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === "howToUse" && (
          <div className="prose max-w-none">
            <h3 className="mb-3 text-lg font-medium">How to Use</h3>
            <p className="">{product.howToUse}</p>
          </div>
        )}

        {activeTab === "ingredients" && (
          <div className="prose max-w-none">
            <h3 className="mb-3 text-lg font-medium">Ingredients</h3>
            <p className="">{product.ingredients}</p>
          </div>
        )}
      </div>
    </div>
  );
}
