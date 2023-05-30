/*
  Warnings:

  - You are about to drop the `_CommentToLike` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_LikeToPost` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_LikeToUser` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `commentId` to the `Like` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postId` to the `Like` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_CommentToLike" DROP CONSTRAINT "_CommentToLike_A_fkey";

-- DropForeignKey
ALTER TABLE "_CommentToLike" DROP CONSTRAINT "_CommentToLike_B_fkey";

-- DropForeignKey
ALTER TABLE "_LikeToPost" DROP CONSTRAINT "_LikeToPost_A_fkey";

-- DropForeignKey
ALTER TABLE "_LikeToPost" DROP CONSTRAINT "_LikeToPost_B_fkey";

-- DropForeignKey
ALTER TABLE "_LikeToUser" DROP CONSTRAINT "_LikeToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_LikeToUser" DROP CONSTRAINT "_LikeToUser_B_fkey";

-- AlterTable
ALTER TABLE "Like" ADD COLUMN     "commentId" TEXT NOT NULL,
ADD COLUMN     "postId" TEXT NOT NULL;

-- DropTable
DROP TABLE "_CommentToLike";

-- DropTable
DROP TABLE "_LikeToPost";

-- DropTable
DROP TABLE "_LikeToUser";

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
