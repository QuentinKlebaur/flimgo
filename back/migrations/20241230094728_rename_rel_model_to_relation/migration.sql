/*
  Warnings:

  - You are about to drop the `BingoTileRelModel` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserGroupRelModel` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserSessionRelModel` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "BingoTileRelModel" DROP CONSTRAINT "BingoTileRelModel_bingoId_fkey";

-- DropForeignKey
ALTER TABLE "BingoTileRelModel" DROP CONSTRAINT "BingoTileRelModel_tileId_fkey";

-- DropForeignKey
ALTER TABLE "UserGroupRelModel" DROP CONSTRAINT "UserGroupRelModel_groupId_fkey";

-- DropForeignKey
ALTER TABLE "UserGroupRelModel" DROP CONSTRAINT "UserGroupRelModel_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserSessionRelModel" DROP CONSTRAINT "UserSessionRelModel_sessionId_fkey";

-- DropForeignKey
ALTER TABLE "UserSessionRelModel" DROP CONSTRAINT "UserSessionRelModel_userId_fkey";

-- DropTable
DROP TABLE "BingoTileRelModel";

-- DropTable
DROP TABLE "UserGroupRelModel";

-- DropTable
DROP TABLE "UserSessionRelModel";

-- CreateTable
CREATE TABLE "BingoTileRelation" (
    "bingoId" TEXT NOT NULL,
    "tileId" TEXT NOT NULL,
    "position" INTEGER NOT NULL,

    CONSTRAINT "BingoTileRelation_pkey" PRIMARY KEY ("bingoId","tileId")
);

-- CreateTable
CREATE TABLE "UserGroupRelation" (
    "userId" TEXT NOT NULL,
    "groupId" TEXT NOT NULL,
    "roles" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "UserGroupRelation_pkey" PRIMARY KEY ("userId","groupId")
);

-- CreateTable
CREATE TABLE "UserSessionRelation" (
    "userId" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "checekd" BOOLEAN NOT NULL,

    CONSTRAINT "UserSessionRelation_pkey" PRIMARY KEY ("userId","sessionId")
);

-- AddForeignKey
ALTER TABLE "BingoTileRelation" ADD CONSTRAINT "BingoTileRelation_bingoId_fkey" FOREIGN KEY ("bingoId") REFERENCES "Bingo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BingoTileRelation" ADD CONSTRAINT "BingoTileRelation_tileId_fkey" FOREIGN KEY ("tileId") REFERENCES "Tile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserGroupRelation" ADD CONSTRAINT "UserGroupRelation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserGroupRelation" ADD CONSTRAINT "UserGroupRelation_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSessionRelation" ADD CONSTRAINT "UserSessionRelation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSessionRelation" ADD CONSTRAINT "UserSessionRelation_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session"("id") ON DELETE CASCADE ON UPDATE CASCADE;
