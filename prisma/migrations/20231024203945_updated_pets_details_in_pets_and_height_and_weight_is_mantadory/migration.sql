/*
  Warnings:

  - Made the column `height` on table `PetsDetail` required. This step will fail if there are existing NULL values in that column.
  - Made the column `weight` on table `PetsDetail` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "PETS" ALTER COLUMN "Available" DROP DEFAULT;

-- AlterTable
ALTER TABLE "PetsDetail" ALTER COLUMN "height" SET NOT NULL,
ALTER COLUMN "weight" SET NOT NULL;
