/*
  Warnings:

  - You are about to drop the column `checked` on the `UserSessionRelation` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Bingo" ALTER COLUMN "validated" SET DEFAULT false;

-- AlterTable
ALTER TABLE "BingoTileRelation" ADD COLUMN     "checked" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "UserSessionRelation" DROP COLUMN "checked";
