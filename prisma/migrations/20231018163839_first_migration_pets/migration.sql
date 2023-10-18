-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'MEMBER');

-- CreateEnum
CREATE TYPE "Food" AS ENUM ('LITTLE', 'MODERATELY', 'LOT');

-- CreateEnum
CREATE TYPE "Temperament" AS ENUM ('AGGRESSIVE', 'DEMEANOR');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'MEMBER',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "number" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ORG" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'ADMIN',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "number" TEXT NOT NULL,

    CONSTRAINT "ORG_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PETS" (
    "id" TEXT NOT NULL,
    "race" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "characteristics" TEXT NOT NULL,
    "Available" BOOLEAN NOT NULL,
    "oRGId" TEXT NOT NULL,
    "userId" TEXT,

    CONSTRAINT "PETS_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PetsDetail" (
    "id" TEXT NOT NULL,
    "height" DECIMAL(65,30) NOT NULL,
    "weight" DECIMAL(65,30) NOT NULL,
    "temperament" "Temperament" NOT NULL,
    "food" "Food" NOT NULL,

    CONSTRAINT "PetsDetail_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "ORG_email_key" ON "ORG"("email");

-- AddForeignKey
ALTER TABLE "PETS" ADD CONSTRAINT "PETS_oRGId_fkey" FOREIGN KEY ("oRGId") REFERENCES "ORG"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PETS" ADD CONSTRAINT "PETS_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
