import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TYPE "cms"."enum_courses_category" ADD VALUE 'Intensive English';
  ALTER TYPE "cms"."enum_courses_category" ADD VALUE 'IELTS Preparation';
  ALTER TYPE "cms"."enum_courses_category" ADD VALUE 'Academic English';
  ALTER TYPE "cms"."enum_courses_category" ADD VALUE 'University Pathway';
  ALTER TYPE "cms"."enum_courses_category" ADD VALUE 'English Speaking';
  ALTER TYPE "cms"."enum_courses_category" ADD VALUE 'Business English';
  ALTER TYPE "cms"."enum_courses_category" ADD VALUE 'TOEFL Preparation';
  ALTER TYPE "cms"."enum_courses_category" ADD VALUE 'Short Camps';
  CREATE TABLE "cms"."posts_faqs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar NOT NULL,
  	"answer" varchar NOT NULL
  );
  
  CREATE TABLE "cms"."courses_highlights" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  ALTER TABLE "cms"."media" ADD COLUMN "sizes_card_url" varchar;
  ALTER TABLE "cms"."media" ADD COLUMN "sizes_card_width" numeric;
  ALTER TABLE "cms"."media" ADD COLUMN "sizes_card_height" numeric;
  ALTER TABLE "cms"."media" ADD COLUMN "sizes_card_mime_type" varchar;
  ALTER TABLE "cms"."media" ADD COLUMN "sizes_card_filesize" numeric;
  ALTER TABLE "cms"."media" ADD COLUMN "sizes_card_filename" varchar;
  ALTER TABLE "cms"."media" ADD COLUMN "sizes_og_url" varchar;
  ALTER TABLE "cms"."media" ADD COLUMN "sizes_og_width" numeric;
  ALTER TABLE "cms"."media" ADD COLUMN "sizes_og_height" numeric;
  ALTER TABLE "cms"."media" ADD COLUMN "sizes_og_mime_type" varchar;
  ALTER TABLE "cms"."media" ADD COLUMN "sizes_og_filesize" numeric;
  ALTER TABLE "cms"."media" ADD COLUMN "sizes_og_filename" varchar;
  ALTER TABLE "cms"."posts" ADD COLUMN "featured_image_id" integer;
  ALTER TABLE "cms"."posts" ADD COLUMN "published_date" timestamp(3) with time zone;
  ALTER TABLE "cms"."posts" ADD COLUMN "author" varchar DEFAULT 'ALC English Team';
  ALTER TABLE "cms"."posts" ADD COLUMN "category" varchar;
  ALTER TABLE "cms"."posts" ADD COLUMN "reading_time" numeric;
  ALTER TABLE "cms"."posts" ADD COLUMN "canonical_url" varchar;
  ALTER TABLE "cms"."posts" ADD COLUMN "noindex" boolean DEFAULT false;
  ALTER TABLE "cms"."courses" ADD COLUMN "focus_keyword" varchar;
  ALTER TABLE "cms"."courses" ADD COLUMN "summary" varchar;
  ALTER TABLE "cms"."courses" ADD COLUMN "hero_image_id" integer;
  ALTER TABLE "cms"."courses" ADD COLUMN "facts_duration" varchar;
  ALTER TABLE "cms"."courses" ADD COLUMN "facts_level" varchar;
  ALTER TABLE "cms"."courses" ADD COLUMN "facts_schedule" varchar;
  ALTER TABLE "cms"."courses" ADD COLUMN "facts_intake" varchar;
  ALTER TABLE "cms"."courses" ADD COLUMN "facts_price" varchar;
  ALTER TABLE "cms"."courses" ADD COLUMN "sort_order" numeric DEFAULT 100;
  ALTER TABLE "cms"."courses" ADD COLUMN "canonical_url" varchar;
  ALTER TABLE "cms"."courses" ADD COLUMN "noindex" boolean DEFAULT false;
  ALTER TABLE "cms"."posts_faqs" ADD CONSTRAINT "posts_faqs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."courses_highlights" ADD CONSTRAINT "courses_highlights_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."courses"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "posts_faqs_order_idx" ON "cms"."posts_faqs" USING btree ("_order");
  CREATE INDEX "posts_faqs_parent_id_idx" ON "cms"."posts_faqs" USING btree ("_parent_id");
  CREATE INDEX "courses_highlights_order_idx" ON "cms"."courses_highlights" USING btree ("_order");
  CREATE INDEX "courses_highlights_parent_id_idx" ON "cms"."courses_highlights" USING btree ("_parent_id");
  ALTER TABLE "cms"."posts" ADD CONSTRAINT "posts_featured_image_id_media_id_fk" FOREIGN KEY ("featured_image_id") REFERENCES "cms"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "cms"."courses" ADD CONSTRAINT "courses_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "cms"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "media_sizes_card_sizes_card_filename_idx" ON "cms"."media" USING btree ("sizes_card_filename");
  CREATE INDEX "media_sizes_og_sizes_og_filename_idx" ON "cms"."media" USING btree ("sizes_og_filename");
  CREATE INDEX "posts_featured_image_idx" ON "cms"."posts" USING btree ("featured_image_id");
  CREATE INDEX "courses_hero_image_idx" ON "cms"."courses" USING btree ("hero_image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "cms"."posts_faqs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "cms"."courses_highlights" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "cms"."posts_faqs" CASCADE;
  DROP TABLE "cms"."courses_highlights" CASCADE;
  ALTER TABLE "cms"."posts" DROP CONSTRAINT "posts_featured_image_id_media_id_fk";
  
  ALTER TABLE "cms"."courses" DROP CONSTRAINT "courses_hero_image_id_media_id_fk";
  
  ALTER TABLE "cms"."courses" ALTER COLUMN "category" SET DATA TYPE text;
  DROP TYPE "cms"."enum_courses_category";
  CREATE TYPE "cms"."enum_courses_category" AS ENUM('IGCSE', 'A-Level', 'CBSE', 'IB', 'Homeschooling', 'Language', 'IELTS/PTE', 'Corporate English', 'Kids English');
  ALTER TABLE "cms"."courses" ALTER COLUMN "category" SET DATA TYPE "cms"."enum_courses_category" USING "category"::"cms"."enum_courses_category";
  DROP INDEX "cms"."media_sizes_card_sizes_card_filename_idx";
  DROP INDEX "cms"."media_sizes_og_sizes_og_filename_idx";
  DROP INDEX "cms"."posts_featured_image_idx";
  DROP INDEX "cms"."courses_hero_image_idx";
  ALTER TABLE "cms"."media" DROP COLUMN "sizes_card_url";
  ALTER TABLE "cms"."media" DROP COLUMN "sizes_card_width";
  ALTER TABLE "cms"."media" DROP COLUMN "sizes_card_height";
  ALTER TABLE "cms"."media" DROP COLUMN "sizes_card_mime_type";
  ALTER TABLE "cms"."media" DROP COLUMN "sizes_card_filesize";
  ALTER TABLE "cms"."media" DROP COLUMN "sizes_card_filename";
  ALTER TABLE "cms"."media" DROP COLUMN "sizes_og_url";
  ALTER TABLE "cms"."media" DROP COLUMN "sizes_og_width";
  ALTER TABLE "cms"."media" DROP COLUMN "sizes_og_height";
  ALTER TABLE "cms"."media" DROP COLUMN "sizes_og_mime_type";
  ALTER TABLE "cms"."media" DROP COLUMN "sizes_og_filesize";
  ALTER TABLE "cms"."media" DROP COLUMN "sizes_og_filename";
  ALTER TABLE "cms"."posts" DROP COLUMN "featured_image_id";
  ALTER TABLE "cms"."posts" DROP COLUMN "published_date";
  ALTER TABLE "cms"."posts" DROP COLUMN "author";
  ALTER TABLE "cms"."posts" DROP COLUMN "category";
  ALTER TABLE "cms"."posts" DROP COLUMN "reading_time";
  ALTER TABLE "cms"."posts" DROP COLUMN "canonical_url";
  ALTER TABLE "cms"."posts" DROP COLUMN "noindex";
  ALTER TABLE "cms"."courses" DROP COLUMN "focus_keyword";
  ALTER TABLE "cms"."courses" DROP COLUMN "summary";
  ALTER TABLE "cms"."courses" DROP COLUMN "hero_image_id";
  ALTER TABLE "cms"."courses" DROP COLUMN "facts_duration";
  ALTER TABLE "cms"."courses" DROP COLUMN "facts_level";
  ALTER TABLE "cms"."courses" DROP COLUMN "facts_schedule";
  ALTER TABLE "cms"."courses" DROP COLUMN "facts_intake";
  ALTER TABLE "cms"."courses" DROP COLUMN "facts_price";
  ALTER TABLE "cms"."courses" DROP COLUMN "sort_order";
  ALTER TABLE "cms"."courses" DROP COLUMN "canonical_url";
  ALTER TABLE "cms"."courses" DROP COLUMN "noindex";`)
}
