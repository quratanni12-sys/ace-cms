import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`ALTER TYPE "cms"."enum_posts_business" RENAME VALUE 'ACE Language Center' TO 'ALC English'`)
  await db.execute(sql`ALTER TYPE "cms"."enum_courses_business" RENAME VALUE 'ACE Language Center' TO 'ALC English'`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`ALTER TYPE "cms"."enum_posts_business" RENAME VALUE 'ALC English' TO 'ACE Language Center'`)
  await db.execute(sql`ALTER TYPE "cms"."enum_courses_business" RENAME VALUE 'ALC English' TO 'ACE Language Center'`)
}