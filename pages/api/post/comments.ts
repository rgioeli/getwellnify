import { prisma } from "@/utils/connect";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { postId, parentId } = req.body;
  //* The parentId will come through when we have a comment that we need to get child comments for
  //* The postId will come through when we need to get the initial layer of comments
  try {
    if (postId) {
      //* Return the first-layer of comments associated with the post
      const response = await prisma.comment.findMany({
        where: {
          postId: postId,
          AND: {
            parentId: null,
          },
        },
        //* The 'where' property is looking for first-layer comments only by setting parentId to null.
        //* - if we were to get all the postId comments it would get all of the nested
        //* - commets and we don't want that. We want to be able to query them one-by-one at the users request to save on data.
        select: {
          id: true,
          content: true,
          channel: true,
          likesCount: true,
          replyCount: true,
          createdAt: true,
          user: {
            select: {
              id: true,
              image: true,
              username: true,
            },
          },
          Like: {
            select: {
              userId: true,
            },
          },
        },
      });

      // const incrementedReplyCountForPost = await prisma.post.update({
      //   where: {
      //     id: postId,
      //   },
      //   data: {
      //     replyCount: {
      //       increment: 1,
      //     },
      //   },
      // });

      // if (!incrementedReplyCountForPost) {
      //   throw {
      //     success: false,
      //     message: "Unable to increment the replyCount on post.",
      //   };
      // }

      return res.status(200).json({ success: response, message: "Success" });
    } else {
      if (parentId) {
        const response = await prisma.comment.findMany({
          where: {
            parentId,
          },
          select: {
            id: true,
            content: true,
            channel: true,
            likesCount: true,
            replyCount: true,
            createdAt: true,
            user: {
              select: {
                id: true,
                image: true,
                username: true,
              },
            },
          },
        });

        return res.status(200).json({ success: response, message: "Success" });
      }
    }
  } catch (e) {
    const error = e as { statusCode: number; message: string };
    return res
      .status(error.statusCode)
      .json({ success: false, message: error.message });
  }

  return res.status(404).json({ success: false, message: "No results" });
}
