import { db } from "@/db";
import { categories } from "@/db/schema";

export async function GET() {
  const cats = await db.select().from(categories);

  return new Response(JSON.stringify(cats), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
