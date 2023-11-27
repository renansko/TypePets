/*
  Warnings:

  - Added the required column `name` to the `PETS` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PETS" ADD COLUMN     "name" TEXT NOT NULL;
