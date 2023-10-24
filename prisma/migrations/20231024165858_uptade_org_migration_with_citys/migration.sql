/*
  Warnings:

  - Added the required column `city` to the `ORG` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ORG" ADD COLUMN     "city" TEXT NOT NULL;
