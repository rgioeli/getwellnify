import { prisma } from "@/utils/connect";

type LikeActionType = "COMMIT" | "DELETE";

export const likeAPostOrComment = async ({
  uid,
  action,
  postId,
  commentId,
}: {
  uid: string;
  action: LikeActionType;
  postId?: string;
  commentId?: string;
}) => {
  try {
    if (postId) {
      //* Increment the likes-count by 1 on the post
      if (action == "COMMIT") {
        const saved = await prisma.post.update({
          where: {
            id: postId,
          },
          data: {
            likesCount: {
              increment: 1,
            },
          },
        });

        //* Create a like instance in the likes Model for the post
        const savedInLikeModel = await prisma.like.create({
          data: {
            postId,
            userId: uid,
          },
        });

        if (!saved) {
          throw { success: false, message: "Unable to save a post-like" };
        }

        if (!savedInLikeModel) {
          throw { success: false, message: "Unable to save in Like model" };
        }

        return {
          success: true,
          message: "The like on the post was saved successfully.",
        };
      } else {
        //* Decrement the likes count on the post by 1
        if (action === "DELETE") {
          const saved = await prisma.post.update({
            where: {
              id: postId,
            },
            data: {
              likesCount: {
                decrement: 1,
              },
            },
          });
          //* Also, delete the like instance related to the post in the Likes model
          const deleteInLikeModel = await prisma.like.delete({
            where: {
              userId_postId: {
                postId,
                userId: uid,
              },
            },
          });

          if (!saved) {
            throw { success: false, message: "Unable to delete a post-like" };
          }

          if (!deleteInLikeModel) {
            throw {
              success: false,
              message: "Unable to delete the like on the post",
            };
          }

          return {
            success: true,
            message: "The like on the post was deleted successfully.",
          };
        }
      }
    } else if (commentId) {
      if (action === "COMMIT") {
        //* increment the likes count by 1 on the comment
        const saved = await prisma.comment.update({
          where: {
            id: commentId,
          },
          data: {
            likesCount: {
              increment: 1,
            },
          },
        });
        //* create a like instance in the Like model
        const savedInLikeModel = await prisma.like.create({
          data: {
            commentId,
            userId: uid,
          },
        });

        if (!saved) {
          throw { success: false, message: "Unable to save a comment-like" };
        }

        if (!savedInLikeModel) {
          throw {
            success: false,
            message: "Unable to save a comment in the Like model",
          };
        }

        return {
          success: true,
          message: "The like on the comment was saved successfully.",
        };
      } else {
        //* decrement the count by 1 on the comment likes-count
        if (action === "DELETE") {
          const deleted = await prisma.comment.update({
            where: {
              id: commentId,
            },
            data: {
              likesCount: {
                decrement: 1,
              },
            },
          });
          //* remove the like from the Like model
          const removeLike = await prisma.like.delete({
            where: {
              userId_commentId: {
                userId: uid,
                commentId,
              },
            },
          });

          if (!deleted) {
            throw {
              success: false,
              message: "Unable to delete a comment-like",
            };
          }

          if (!removeLike) {
            throw {
              success: false,
              message: "Unable to remove comment-like from Like model",
            };
          }

          return {
            success: true,
            message: "The like on the comment was deleted successfully.",
          };
        }
      }
    }
  } catch (error) {
    const e = error as { success: boolean; message: string };
    return e;
  }
};
