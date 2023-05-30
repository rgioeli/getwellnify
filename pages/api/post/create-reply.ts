import { isAuthenticatedApiRoute } from "@/services/helpers/isAuthenticatedApiRoute";
import { prisma } from "@/utils/connect";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { postId, content, channel, parentId } = req.body;
    const { success, message } = await isAuthenticatedApiRoute(req, res);

    if (!success) throw { statusCode: 401, message };

    if (parentId) {
      //*todo: If we have a parentId, we need to find the comment we are referencing.
      //*todo - We get the origin postId to update our comment with that postId
      //*todo - so later, we can query all comments nested together from just one postId
      const queryPostId = await prisma.comment.findUnique({
        where: {
          id: parentId,
        },
        select: {
          postId: true,
        },
      });

      if (!queryPostId) {
        throw { statusCode: 404, message: "Could not find the origin post." };
      }

      //* now that we have the postId, we need to update our comment with the postId
      const commentOnComment = await prisma.comment.create({
        data: {
          channel,
          post: {
            connect: {
              id: queryPostId?.postId,
            },
          },
          content,
          parentComment: {
            connect: {
              id: parentId,
            },
          },
          user: {
            connect: {
              id: success.id,
            },
          },
        },
      });
      if (!commentOnComment) {
        throw {
          statusCode: 500,
          message: "Unable to save the comment. Please try again later.",
        };
      }
    } else {
      //* We need the postId, content, and channel to create a reply for a post
      //! This query only happens if NO parentId exists. This is saved as a comment on a post, NOT a comment on a comment.

      const commentOnPost = await prisma.comment.create({
        data: {
          post: {
            connect: {
              id: postId,
            },
          },
          user: {
            connect: {
              id: success.id,
            },
          },
          content,
          channel,
        },
      });
      if (!commentOnPost) {
        throw { statusCode: 404, message: "Could not find the origin post." };
      }

      const incrementPostReplyCount = await prisma.post.update({
        where: {
          id: postId,
        },
        data: {
          replyCount: {
            increment: 1,
          },
        },
      });

      if (!incrementPostReplyCount) {
        throw {
          statusCode: 500,
          message:
            "Something went wrong when trying to update the reply count.",
        };
      }
    } //* End of the end

    return res
      .status(200)
      .json({ success: true, message: "Reply successfully saved." });
  } catch (e) {
    const error = e as { statusCode: number | undefined; message: string };
    return res
      .status(error.statusCode || 500)
      .json({ success: false, message: error.message });
  }
}
