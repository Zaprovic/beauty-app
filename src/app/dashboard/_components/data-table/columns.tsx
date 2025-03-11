"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatCOP } from "@/lib/utils";
import { ProductWithCategoryType } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDownIcon, CheckIcon, XIcon } from "lucide-react";

export const columns: ColumnDef<ProductWithCategoryType>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        variant={"ghost"}
        className="hover:cursor-pointer hover:bg-transparent"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Nombre
        <ArrowUpDownIcon className="ml-2 h-4 w-4 hover:font-bold" />
      </Button>
    ),
    cell: ({ row }) => (
      <span className="-tracking-wider">{row.getValue("name")}</span>
    ),
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <Button
        variant={"ghost"}
        className="hover:cursor-pointer hover:bg-transparent"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Precio
        <ArrowUpDownIcon className="ml-2 h-4 w-4 hover:font-bold" />
      </Button>
    ),
    cell: ({ row }) => {
      return formatCOP(row.getValue("price"));
    },
  },
  {
    accessorKey: "brand",
    header: ({ column }) => (
      <Button
        variant={"ghost"}
        className="hover:cursor-pointer hover:bg-transparent"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Marca
        <ArrowUpDownIcon className="ml-2 h-4 w-4 hover:font-bold" />
      </Button>
    ),
    cell: ({ row }) => {
      if (row.getValue("brand") === "") {
        return <Badge variant={"outline"}>-</Badge>;
      }
      return <span className="-tracking-wider">{row.getValue("brand")}</span>;
    },
  },
  {
    accessorKey: "inStock",
    header: "Disponible",
    cell: ({ row }) => {
      if (row.getValue("inStock")) {
        return (
          <div className="w-fit rounded-full bg-emerald-500 p-1 text-white">
            <CheckIcon className="size-4" strokeWidth={3} />
          </div>
        );
      } else {
        return (
          <div className="w-fit rounded-full bg-rose-500 p-1 text-white">
            <XIcon className="size-4" strokeWidth={3} />
          </div>
        );
      }
    },
  },
];
