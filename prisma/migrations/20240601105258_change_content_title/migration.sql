/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - Made the column `title` on table `content` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "content" ALTER COLUMN "title" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "user_name_key" ON "user"("name");
