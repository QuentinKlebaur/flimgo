-- CreateTable
CREATE TABLE "Token" (
    "userId" TEXT NOT NULL,
    "token" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Role" (
    "userId" TEXT NOT NULL,
    "token" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Token_token_key" ON "Token"("token");

-- CreateIndex
CREATE UNIQUE INDEX "Role_userId_key" ON "Role"("userId");

-- AddForeignKey
ALTER TABLE "Token" ADD CONSTRAINT "Token_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Role" ADD CONSTRAINT "Role_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
