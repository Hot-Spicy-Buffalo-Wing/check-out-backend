/*
  Warnings:

  - The primary key for the `content` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `content` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "content" DROP CONSTRAINT "content_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "content_pkey" PRIMARY KEY ("post_id");
