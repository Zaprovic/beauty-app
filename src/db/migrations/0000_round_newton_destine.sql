CREATE TABLE "categories" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"is_active" boolean DEFAULT true,
	CONSTRAINT "categories_name_unique" UNIQUE("name")
);

--> statement-breakpoint
CREATE TABLE "product_categories" (
	"product_id" integer NOT NULL,
	"category_id" integer NOT NULL,
	CONSTRAINT "product_categories_product_id_category_id_pk" PRIMARY KEY("product_id", "category_id")
);

--> statement-breakpoint
CREATE TABLE "products" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"price" real NOT NULL,
	"image" text NOT NULL,
	"description" text NOT NULL,
	"images" text [] DEFAULT '{}',
	"benefits" text [] DEFAULT '{}',
	"how_to_use" text,
	"ingredients" text [] DEFAULT '{}',
	"in_stock" boolean DEFAULT true,
	"created_at" text DEFAULT '2025-03-01T19:04:34.818Z',
	"updated_at" text DEFAULT '2025-03-01T19:04:34.818Z'
);

--> statement-breakpoint
ALTER TABLE
	"product_categories"
ADD
	CONSTRAINT "product_categories_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;

--> statement-breakpoint
ALTER TABLE
	"product_categories"
ADD
	CONSTRAINT "product_categories_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;