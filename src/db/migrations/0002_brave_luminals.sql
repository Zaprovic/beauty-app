ALTER TABLE "products" ALTER COLUMN "created_at" SET DEFAULT '2025-03-01T20:19:47.714Z';--> statement-breakpoint
ALTER TABLE "products" ALTER COLUMN "updated_at" SET DEFAULT '2025-03-01T20:19:47.716Z';--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "discount_percentage" real DEFAULT 0;