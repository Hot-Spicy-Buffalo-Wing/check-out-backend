-- CreateTable
CREATE TABLE "lookbook" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),
    "author_id" UUID NOT NULL,
    "prompt" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,

    CONSTRAINT "lookbook_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "lookbook" ADD CONSTRAINT "lookbook_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "user"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
