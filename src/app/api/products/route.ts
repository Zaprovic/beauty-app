import { NextResponse } from "next/server";
import { db } from "@/db";
import { products as productsTable } from "@/db/schema";

export async function GET() {
  try {
    const products = await db.select().from(productsTable);
    return NextResponse.json(products);
  } catch (error) {
    console.error("Failed to fetch best sellers:", error);
    return NextResponse.json(
      { error: "Failed to fetch best sellers" },
      { status: 500 },
    );
  }
}
