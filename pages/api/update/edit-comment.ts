import { isAuthenticatedApiRoute } from "@/services/helpers/isAuthenticatedApiRoute";
import { prisma } from "@/utils/connect";
import { NextApiResponse, NextApiRequest } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await isAuthenticatedApiRoute(req, res);

  const { commentId, content } = req.body;

  if (!commentId || !content)
    return res
      .status(404)
      .json({ success: false, message: "Missing required resources." });

  const author = await prisma.comment.findUnique({
    where: { id: commentId },
    select: { user: { select: { id: true } } },
  });

  if (!author)
    return res
      .status(404)
      .json({ success: false, message: "Unable to find the resource." });

  if (session.success) {
    if (author?.user.id !== session.success.id) {
      return res.status(401).json({
        success: false,
        message: "User is not permitted to edit this comment.",
      });
    }
  }

  const updated = await prisma.comment.update({
    where: { id: commentId },
    data: { content },
  });
  if (!updated)
    return res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again.",
    });

  return res
    .status(200)
    .json({ success: true, message: "Successful punanie!" });
}
