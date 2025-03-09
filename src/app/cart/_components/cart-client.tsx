"use client";

import { useCartStore } from "@/stores/cart-store";
import Image from "next/image";
import {
  Trash2,
  ShoppingBag,
  MinusCircle,
  PlusCircle,
  CreditCard,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function CartClient() {
  const { items, removeItem, updateQuantity } = useCartStore();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const totalPrice = items.reduce(
    (total, item) => total + item.price * (item.quantity || 1),
    0,
  );

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateQuantity(Number(id), newQuantity);
  };

  if (items.length === 0) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center p-6 text-center">
        <div className="rounded-full bg-gray-100 p-6 dark:bg-gray-800/50">
          <ShoppingBag size={64} className="text-pink-500 dark:text-pink-400" />
        </div>
        <h2 className="mt-6 mb-2 text-2xl font-bold text-gray-800 dark:text-gray-50">
          Your cart is empty
        </h2>
        <p className="mb-8 max-w-md text-gray-500 dark:text-gray-400">
          Looks like you haven&apos;t added anything to your cart yet. Explore
          our products and find something you&apos;ll love.
        </p>
        <Link
          href="/products"
          className="rounded-md bg-gradient-to-r from-pink-600 to-pink-500 px-8 py-3 text-white shadow-lg transition-all hover:from-pink-700 hover:to-pink-600 hover:shadow-xl dark:from-pink-500 dark:to-pink-400 dark:hover:from-pink-600 dark:hover:to-pink-500"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <div className="overflow-hidden rounded-xl bg-white shadow-md dark:border dark:border-gray-700/50 dark:bg-gray-800/50 dark:backdrop-blur-sm">
          <div className="p-6">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex flex-col items-center gap-4 border-b border-gray-200 py-6 last:border-0 sm:flex-row dark:border-gray-700/50"
              >
                <div className="relative h-28 w-28 flex-shrink-0 overflow-hidden rounded-lg shadow-sm">
                  {item.mainImage ? (
                    <Image
                      src={item.mainImage}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gray-100 dark:bg-gray-700">
                      <ShoppingBag
                        size={24}
                        className="text-gray-400 dark:text-gray-500"
                      />
                    </div>
                  )}
                </div>

                <div className="flex-1 text-center sm:text-left">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                    {item.name}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
                    {item.description}
                  </p>
                  <div className="mt-2 font-medium text-pink-600 dark:text-pink-400">
                    ${item.price.toFixed(2)}
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-full bg-gray-50 px-3 py-1 dark:bg-gray-700/50">
                  <button
                    onClick={() =>
                      handleQuantityChange(
                        item.id.toString(),
                        (item.quantity || 1) - 1,
                      )
                    }
                    aria-label="Decrease quantity"
                    className="rounded-full p-1 text-gray-500 transition-colors hover:bg-gray-200 hover:text-pink-600 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-pink-400"
                  >
                    <MinusCircle size={18} />
                  </button>

                  <span className="w-8 text-center font-medium text-gray-800 dark:text-white">
                    {item.quantity || 1}
                  </span>

                  <button
                    onClick={() =>
                      handleQuantityChange(
                        item.id.toString(),
                        (item.quantity || 1) + 1,
                      )
                    }
                    aria-label="Increase quantity"
                    className="rounded-full p-1 text-gray-500 transition-colors hover:bg-gray-200 hover:text-pink-600 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-pink-400"
                  >
                    <PlusCircle size={18} />
                  </button>
                </div>

                <button
                  onClick={() => removeItem(item.id)}
                  className="rounded-full bg-gray-50 p-2 text-gray-400 transition-all hover:bg-red-50 hover:text-red-500 dark:bg-gray-700/50 dark:text-gray-400 dark:hover:bg-red-900/30 dark:hover:text-red-400"
                  aria-label="Remove item"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="lg:col-span-1">
        <div className="sticky top-24 rounded-xl bg-white p-6 shadow-md dark:border dark:border-gray-700/50 dark:bg-gray-800/50 dark:backdrop-blur-sm">
          <h2 className="mb-4 text-xl font-bold text-gray-800 dark:text-white">
            Order Summary
          </h2>

          <div className="mb-6 space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-300">
                Subtotal (
                {items.reduce((count, item) => count + (item.quantity || 1), 0)}{" "}
                items)
              </span>
              <span className="font-medium text-gray-800 dark:text-white">
                ${totalPrice.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-300">Shipping</span>
              <span className="font-medium text-green-600 dark:text-green-400">
                Free
              </span>
            </div>
            <div className="mt-4 border-t border-gray-200 pt-4 dark:border-gray-700/50">
              <div className="flex justify-between font-bold">
                <span className="text-gray-800 dark:text-white">Total</span>
                <span className="text-xl text-pink-600 dark:text-pink-400">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>
              <p className="mt-1 text-right text-xs text-gray-500 dark:text-gray-400">
                Tax included
              </p>
            </div>
          </div>

          <button
            className={`flex w-full items-center justify-center gap-2 rounded-md bg-gradient-to-r from-pink-600 to-pink-500 py-3.5 font-medium text-white shadow-lg transition-all hover:from-pink-700 hover:to-pink-600 hover:shadow-xl dark:from-pink-500 dark:to-pink-400 dark:hover:from-pink-600 dark:hover:to-pink-500 ${
              isCheckingOut ? "cursor-not-allowed opacity-75" : ""
            }`}
            disabled={isCheckingOut}
            onClick={() => setIsCheckingOut(true)}
          >
            {isCheckingOut ? (
              "Processing..."
            ) : (
              <>
                <CreditCard size={18} />
                Checkout Securely
              </>
            )}
          </button>

          <div className="mt-6">
            <Link
              href="/products"
              className="flex items-center justify-center text-gray-600 hover:text-pink-600 dark:text-gray-400 dark:hover:text-pink-400"
            >
              <ShoppingBag size={16} className="mr-2" />
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
