-- DropForeignKey
ALTER TABLE "BingoTileRelation" DROP CONSTRAINT "BingoTileRelation_bingoId_fkey";

-- AddForeignKey
ALTER TABLE "BingoTileRelation" ADD CONSTRAINT "BingoTileRelation_bingoId_fkey" FOREIGN KEY ("bingoId") REFERENCES "Bingo"("id") ON DELETE CASCADE ON UPDATE CASCADE;
