/*
  Warnings:

  - You are about to drop the column `oRGId` on the `PETS` table. All the data in the column will be lost.
  - Added the required column `orgId` to the `PETS` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "PETS" DROP CONSTRAINT "PETS_oRGId_fkey";

-- AlterTable
ALTER TABLE "PETS" DROP COLUMN "oRGId",
ADD COLUMN     "orgId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "PETS" ADD CONSTRAINT "PETS_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "ORG"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
