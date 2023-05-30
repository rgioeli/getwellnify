import { prisma } from "@/utils/connect";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //* Make sure we are getting
  try {
    const { postId } = req.body;
    if (!postId)
      throw {
        statusCode: 404,
        message: "Unable to fetch the resource dependency.",
      };

    const comments = await prisma.post.findMany({
      where: {
        id: postId,
      },
      select: {
        comments: {
          select: {
            id: true,
            content: true,
            user: { select: { id: true, username: true, image: true } },
            createdAt: true,
            channel: true,
          },
        },
      },
    });

    console.log(comments);
    return res
      .status(200)
      .json({ success: comments, message: "Displaying comments." });
  } catch (e) {
    const error = e as unknown as { statusCode: number | 500; message: string };
    return res
      .status(error.statusCode)
      .json({ success: false, message: error.message });
  }
}
