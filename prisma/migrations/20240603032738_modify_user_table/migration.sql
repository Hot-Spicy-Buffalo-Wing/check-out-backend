/*
  Warnings:

  - You are about to drop the column `loginId` on the `user` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[login_id]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `age_range` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `login_id` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "user_loginId_key";

-- AlterTable
ALTER TABLE "user" DROP COLUMN "loginId",
ADD COLUMN     "age_range" TEXT NOT NULL,
ADD COLUMN     "gender" TEXT NOT NULL,
ADD COLUMN     "login_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "user_login_id_key" ON "user"("login_id");
