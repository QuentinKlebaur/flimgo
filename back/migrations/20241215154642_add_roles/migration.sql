/*
  Warnings:

  - You are about to drop the column `token` on the `Role` table. All the data in the column will be lost.
  - Added the required column `roles` to the `Role` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Role" DROP COLUMN "token",
ADD COLUMN     "roles" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Token" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "validUntil" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
