CREATE TABLE "product_option" (
	"id" text PRIMARY KEY NOT NULL,
	"category" text NOT NULL,
	"name" text NOT NULL,
	"name_zh" text NOT NULL,
	"description" text,
	"description_zh" text,
	"price_adjustment" integer DEFAULT 0 NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"enabled" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "wheat_straw_order" (
	"id" text PRIMARY KEY NOT NULL,
	"order_number" text NOT NULL,
	"user_id" text NOT NULL,
	"status" text DEFAULT 'pending' NOT NULL,
	"original_image_url" text,
	"generated_image_url" text NOT NULL,
	"prompt" text,
	"size_option_id" text,
	"frame_option_id" text,
	"mounting_option_id" text,
	"base_price" integer NOT NULL,
	"total_price" integer NOT NULL,
	"currency" text DEFAULT 'USD' NOT NULL,
	"recipient_name" text NOT NULL,
	"recipient_phone" text NOT NULL,
	"shipping_address" text NOT NULL,
	"shipping_city" text NOT NULL,
	"shipping_province" text NOT NULL,
	"shipping_postal_code" text,
	"shipping_country" text DEFAULT 'CN' NOT NULL,
	"shipping_company" text,
	"tracking_number" text,
	"payment_id" text,
	"session_id" text,
	"customer_note" text,
	"admin_note" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"paid_at" timestamp,
	"in_production_at" timestamp,
	"shipped_at" timestamp,
	"completed_at" timestamp,
	"cancelled_at" timestamp,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "wheat_straw_order_order_number_unique" UNIQUE("order_number")
);
--> statement-breakpoint
ALTER TABLE "wheat_straw_order" ADD CONSTRAINT "wheat_straw_order_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "wheat_straw_order" ADD CONSTRAINT "wheat_straw_order_size_option_id_product_option_id_fk" FOREIGN KEY ("size_option_id") REFERENCES "public"."product_option"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "wheat_straw_order" ADD CONSTRAINT "wheat_straw_order_frame_option_id_product_option_id_fk" FOREIGN KEY ("frame_option_id") REFERENCES "public"."product_option"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "wheat_straw_order" ADD CONSTRAINT "wheat_straw_order_mounting_option_id_product_option_id_fk" FOREIGN KEY ("mounting_option_id") REFERENCES "public"."product_option"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "wheat_straw_order" ADD CONSTRAINT "wheat_straw_order_payment_id_payment_id_fk" FOREIGN KEY ("payment_id") REFERENCES "public"."payment"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "product_option_category_idx" ON "product_option" USING btree ("category");--> statement-breakpoint
CREATE INDEX "product_option_enabled_idx" ON "product_option" USING btree ("enabled");--> statement-breakpoint
CREATE INDEX "wheat_straw_order_user_id_idx" ON "wheat_straw_order" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "wheat_straw_order_status_idx" ON "wheat_straw_order" USING btree ("status");--> statement-breakpoint
CREATE INDEX "wheat_straw_order_number_idx" ON "wheat_straw_order" USING btree ("order_number");--> statement-breakpoint
CREATE INDEX "wheat_straw_order_payment_id_idx" ON "wheat_straw_order" USING btree ("payment_id");--> statement-breakpoint
CREATE INDEX "wheat_straw_order_created_at_idx" ON "wheat_straw_order" USING btree ("created_at");