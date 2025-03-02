import { NextResponse } from "next/server";
import { db } from "@/db";
import { categories as categoriesTable } from "@/db/schema";

export async function GET() {
  try {
    const categories = await db.select().from(categoriesTable);
    return NextResponse.json(categories);
  } catch (error) {
    console.error("Failed to fetch best sellers:", error);
    return NextResponse.json(
      { error: "Failed to fetch best sellers" },
      { status: 500 },
    );
  }
}
