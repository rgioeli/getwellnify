-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "likeCommentId" TEXT,
ADD COLUMN     "likeUserId" TEXT;

-- CreateTable
CREATE TABLE "Like" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Like_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_LikeToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_LikeToPost" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_CommentToLike" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_LikeToUser_AB_unique" ON "_LikeToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_LikeToUser_B_index" ON "_LikeToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_LikeToPost_AB_unique" ON "_LikeToPost"("A", "B");

-- CreateIndex
CREATE INDEX "_LikeToPost_B_index" ON "_LikeToPost"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CommentToLike_AB_unique" ON "_CommentToLike"("A", "B");

-- CreateIndex
CREATE INDEX "_CommentToLike_B_index" ON "_CommentToLike"("B");

-- AddForeignKey
ALTER TABLE "_LikeToUser" ADD CONSTRAINT "_LikeToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Like"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LikeToUser" ADD CONSTRAINT "_LikeToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LikeToPost" ADD CONSTRAINT "_LikeToPost_A_fkey" FOREIGN KEY ("A") REFERENCES "Like"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LikeToPost" ADD CONSTRAINT "_LikeToPost_B_fkey" FOREIGN KEY ("B") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CommentToLike" ADD CONSTRAINT "_CommentToLike_A_fkey" FOREIGN KEY ("A") REFERENCES "Comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CommentToLike" ADD CONSTRAINT "_CommentToLike_B_fkey" FOREIGN KEY ("B") REFERENCES "Like"("id") ON DELETE CASCADE ON UPDATE CASCADE;
