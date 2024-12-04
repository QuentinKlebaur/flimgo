-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "hashedPassword" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Group" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Group_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "groupId" TEXT NOT NULL,
    "flimTitle" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "startedAt" TIMESTAMP(3),
    "finishedAt" TIMESTAMP(3),

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tile" (
    "id" TEXT NOT NULL,
    "groupId" TEXT NOT NULL,
    "userId" TEXT,
    "text" VARCHAR(1000) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Tile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bingo" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "sessionId" TEXT NOT NULL,
    "validated" BOOLEAN NOT NULL,

    CONSTRAINT "Bingo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BingoTileRelModel" (
    "bingoId" TEXT NOT NULL,
    "tileId" TEXT NOT NULL,
    "position" INTEGER NOT NULL,

    CONSTRAINT "BingoTileRelModel_pkey" PRIMARY KEY ("bingoId","tileId")
);

-- CreateTable
CREATE TABLE "UserGroupRelModel" (
    "userId" TEXT NOT NULL,
    "groupId" TEXT NOT NULL,

    CONSTRAINT "UserGroupRelModel_pkey" PRIMARY KEY ("userId","groupId")
);

-- CreateTable
CREATE TABLE "UserSessionRelModel" (
    "userId" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "checekd" BOOLEAN NOT NULL,

    CONSTRAINT "UserSessionRelModel_pkey" PRIMARY KEY ("userId","sessionId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Group_id_key" ON "Group"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Session_id_key" ON "Session"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Tile_id_key" ON "Tile"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Bingo_id_key" ON "Bingo"("id");

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tile" ADD CONSTRAINT "Tile_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tile" ADD CONSTRAINT "Tile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bingo" ADD CONSTRAINT "Bingo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bingo" ADD CONSTRAINT "Bingo_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BingoTileRelModel" ADD CONSTRAINT "BingoTileRelModel_bingoId_fkey" FOREIGN KEY ("bingoId") REFERENCES "Bingo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BingoTileRelModel" ADD CONSTRAINT "BingoTileRelModel_tileId_fkey" FOREIGN KEY ("tileId") REFERENCES "Tile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserGroupRelModel" ADD CONSTRAINT "UserGroupRelModel_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserGroupRelModel" ADD CONSTRAINT "UserGroupRelModel_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSessionRelModel" ADD CONSTRAINT "UserSessionRelModel_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSessionRelModel" ADD CONSTRAINT "UserSessionRelModel_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
