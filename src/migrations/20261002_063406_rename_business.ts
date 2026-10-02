import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  // posts
  await db.execute(sql`ALTER TABLE "cms"."posts" ALTER COLUMN "business" SET DATA TYPE text`)
  await db.execute(sql`UPDATE "cms"."posts" SET "business" = 'ALC English' WHERE "business" = 'ACE Language Center'`)
  await db.execute(sql`UPDATE "cms"."posts" SET "business" = NULL WHERE "business" = 'ACE WEB Services'`)
  await db.execute(sql`DROP TYPE "cms"."enum_posts_business"`)
  await db.execute(sql`CREATE TYPE "cms"."enum_posts_business" AS ENUM('ACE Education', 'ALC English')`)
  await db.execute(sql`ALTER TABLE "cms"."posts" ALTER COLUMN "business" SET DATA TYPE "cms"."enum_posts_business" USING "business"::"cms"."enum_posts_business"`)

  // courses
  await db.execute(sql`ALTER TABLE "cms"."courses" ALTER COLUMN "business" SET DATA TYPE text`)
  await db.execute(sql`UPDATE "cms"."courses" SET "business" = 'ALC English' WHERE "business" = 'ACE Language Center'`)
  await db.execute(sql`UPDATE "cms"."courses" SET "business" = NULL WHERE "business" = 'ACE WEB Services'`)
  await db.execute(sql`DROP TYPE "cms"."enum_courses_business"`)
  await db.execute(sql`CREATE TYPE "cms"."enum_courses_business" AS ENUM('ACE Education', 'ALC English')`)
  await db.execute(sql`ALTER TABLE "cms"."courses" ALTER COLUMN "business" SET DATA TYPE "cms"."enum_courses_business" USING "business"::"cms"."enum_courses_business"`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  // is tabdeeli ko wapas karne ki zaroorat nahi
}