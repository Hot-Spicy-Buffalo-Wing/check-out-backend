/*
  Warnings:

  - You are about to drop the column `url` on the `file` table. All the data in the column will be lost.
  - Added the required column `image_uuid` to the `file` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
-- ALTER TABLE "file" DROP COLUMN "url",
-- ADD COLUMN     "image_uuid" TEXT NOT NULL;

ALTER TABLE "file" RENAME COLUMN "url" TO "image_uuid";