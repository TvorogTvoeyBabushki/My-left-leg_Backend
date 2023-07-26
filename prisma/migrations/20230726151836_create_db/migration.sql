-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "img" TEXT[],
    "categorysIds" TEXT[],

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);
