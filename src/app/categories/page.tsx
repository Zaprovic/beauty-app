/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { CategoryType } from "@/types";

const CategoriesPage = () => {
  const [categories, setCategories] = useState<CategoryType[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch("/api/categories");
      const data = await response.json();
      setCategories(data);
    };
    fetchCategories();
  }, [categories]);

  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-16 text-center">
        <h1 className="mb-4 text-4xl font-bold text-gray-800 md:text-5xl">
          Beauty Categories
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-gray-600">
          Explore our carefully curated collections of premium beauty and
          skincare products designed to enhance your natural beauty
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((category, index) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`overflow-hidden rounded-xl shadow-lg transition-shadow duration-300 hover:shadow-xl`}
          >
            <Link href={`/categories/${category.id}`} className="block">
              <div className="relative h-64 w-full">
                <img
                  src={"images/beauty-01.webp"}
                  alt={"name"}
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="mb-2 text-2xl font-semibold text-gray-800">
                  {category.name}
                </h3>
                <p className="mb-4 line-clamp-4 text-gray-600">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sit
                  voluptates dicta ut officiis, doloribus vel possimus
                  architecto quo inventore provident fugit nulla adipisci eos
                  reprehenderit maiores placeat ipsa ipsum ipsam rerum eum eius
                  dolore aut? Tempore quidem fugit suscipit eaque officia non
                  perspiciatis aspernatur eveniet, dignissimos voluptatibus cum
                  quam saepe minus, quas temporibus alias nam rem? A corrupti
                  consequatur reprehenderit nostrum! Veniam adipisci aliquam
                  quia, cupiditate fuga quisquam numquam sed, expedita soluta
                  molestias magni corrupti dolorem ipsum repudiandae. Numquam
                  nulla eum mollitia porro assumenda impedit? Optio illum
                  maiores nesciunt, dolores distinctio quisquam impedit, amet
                  esse dignissimos maxime nobis odio vero.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-500">
                    Explore collection
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5 text-gray-500"
                  >
                    <path d="m9 18 6-6-6-6"></path>
                  </svg>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesPage;
