/*
  Warnings:

  - Added the required column `petsDetailId` to the `PETS` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PETS" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "petsDetailId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "PetsDetail" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AddForeignKey
ALTER TABLE "PETS" ADD CONSTRAINT "PETS_petsDetailId_fkey" FOREIGN KEY ("petsDetailId") REFERENCES "PetsDetail"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
