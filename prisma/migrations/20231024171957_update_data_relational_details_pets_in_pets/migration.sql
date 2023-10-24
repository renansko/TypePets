/*
  Warnings:

  - You are about to drop the column `petsDetailId` on the `PETS` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "PETS" DROP CONSTRAINT "PETS_petsDetailId_fkey";

-- AlterTable
ALTER TABLE "PETS" DROP COLUMN "petsDetailId";

-- AlterTable
ALTER TABLE "PetsDetail" ADD COLUMN     "petsId" TEXT,
ALTER COLUMN "height" DROP NOT NULL,
ALTER COLUMN "weight" DROP NOT NULL,
ALTER COLUMN "temperament" DROP NOT NULL,
ALTER COLUMN "food" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "PetsDetail" ADD CONSTRAINT "PetsDetail_petsId_fkey" FOREIGN KEY ("petsId") REFERENCES "PETS"("id") ON DELETE SET NULL ON UPDATE CASCADE;
