/*
  Warnings:

  - A unique constraint covering the columns `[loginId]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `loginId` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user" ADD COLUMN     "loginId" TEXT NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "user_loginId_key" ON "user"("loginId");
