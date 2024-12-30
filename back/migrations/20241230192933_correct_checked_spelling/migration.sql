/*
  Warnings:

  - You are about to drop the column `checekd` on the `UserSessionRelation` table. All the data in the column will be lost.
  - Added the required column `checked` to the `UserSessionRelation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserSessionRelation" DROP COLUMN "checekd",
ADD COLUMN     "checked" BOOLEAN NOT NULL;
