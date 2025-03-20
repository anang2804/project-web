/*
  Warnings:

  - The primary key for the `Progress` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Progress" DROP CONSTRAINT "Progress_pkey",
ADD COLUMN     "id" TEXT,
ALTER COLUMN "progress" SET DEFAULT 0,
ALTER COLUMN "lastLesson" SET DEFAULT 0;
