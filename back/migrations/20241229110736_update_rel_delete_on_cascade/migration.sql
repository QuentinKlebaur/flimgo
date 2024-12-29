-- DropForeignKey
ALTER TABLE "GroupInvitation" DROP CONSTRAINT "GroupInvitation_groupId_fkey";

-- DropForeignKey
ALTER TABLE "UserGroupRelModel" DROP CONSTRAINT "UserGroupRelModel_groupId_fkey";

-- DropForeignKey
ALTER TABLE "UserGroupRelModel" DROP CONSTRAINT "UserGroupRelModel_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserSessionRelModel" DROP CONSTRAINT "UserSessionRelModel_sessionId_fkey";

-- DropForeignKey
ALTER TABLE "UserSessionRelModel" DROP CONSTRAINT "UserSessionRelModel_userId_fkey";

-- AddForeignKey
ALTER TABLE "GroupInvitation" ADD CONSTRAINT "GroupInvitation_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserGroupRelModel" ADD CONSTRAINT "UserGroupRelModel_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserGroupRelModel" ADD CONSTRAINT "UserGroupRelModel_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSessionRelModel" ADD CONSTRAINT "UserSessionRelModel_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSessionRelModel" ADD CONSTRAINT "UserSessionRelModel_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session"("id") ON DELETE CASCADE ON UPDATE CASCADE;
