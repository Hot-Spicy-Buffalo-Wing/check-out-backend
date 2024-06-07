/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `lookbook` table. All the data in the column will be lost.
  - Added the required column `image_uuid` to the `lookbook` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
-- ALTER TABLE "lookbook" DROP COLUMN "imageUrl",
-- ADD COLUMN     "image_uuid" TEXT NOT NULL;

ALTER TABLE "lookbook" RENAME COLUMN "imageUrl" TO "image_uuid";

