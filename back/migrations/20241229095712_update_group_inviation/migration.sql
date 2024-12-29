/*
  Warnings:

  - You are about to drop the column `consumedAt` on the `GroupInvitation` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `GroupInvitation` table. All the data in the column will be lost.
  - Added the required column `counter` to the `GroupInvitation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "GroupInvitation" DROP COLUMN "consumedAt",
DROP COLUMN "email",
ADD COLUMN     "canceled" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "counter" INTEGER NOT NULL;
