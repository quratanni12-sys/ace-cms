import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "cms"."posts" ALTER COLUMN "business" SET DATA TYPE text;
  DROP TYPE "cms"."enum_posts_business";
  CREATE TYPE "cms"."enum_posts_business" AS ENUM('ACE Education', 'ALC English');
  ALTER TABLE "cms"."posts" ALTER COLUMN "business" SET DATA TYPE "cms"."enum_posts_business" USING "business"::"cms"."enum_posts_business";
  ALTER TABLE "cms"."courses" ALTER COLUMN "business" SET DATA TYPE text;
  DROP TYPE "cms"."enum_courses_business";
  CREATE TYPE "cms"."enum_courses_business" AS ENUM('ACE Education', 'ALC English');
  ALTER TABLE "cms"."courses" ALTER COLUMN "business" SET DATA TYPE "cms"."enum_courses_business" USING "business"::"cms"."enum_courses_business";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "cms"."posts" ALTER COLUMN "business" SET DATA TYPE text;
  DROP TYPE "cms"."enum_posts_business";
  CREATE TYPE "cms"."enum_posts_business" AS ENUM('ACE Education', 'ACE Language Center', 'ACE WEB Services');
  ALTER TABLE "cms"."posts" ALTER COLUMN "business" SET DATA TYPE "cms"."enum_posts_business" USING "business"::"cms"."enum_posts_business";
  ALTER TABLE "cms"."courses" ALTER COLUMN "business" SET DATA TYPE text;
  DROP TYPE "cms"."enum_courses_business";
  CREATE TYPE "cms"."enum_courses_business" AS ENUM('ACE Education', 'ACE Language Center');
  ALTER TABLE "cms"."courses" ALTER COLUMN "business" SET DATA TYPE "cms"."enum_courses_business" USING "business"::"cms"."enum_courses_business";`)
}
