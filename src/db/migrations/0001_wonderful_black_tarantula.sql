ALTER TABLE "products" ALTER COLUMN "created_at" SET DEFAULT '2025-03-01T19:49:11.239Z';--> statement-breakpoint
ALTER TABLE "products" ALTER COLUMN "updated_at" SET DEFAULT '2025-03-01T19:49:11.244Z';--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "brand" text NOT NULL;