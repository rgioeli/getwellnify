import { getAdditionalPostsForGuestTimeline } from "@/services/getAdditionalPostsForGuestTimeline";
import { prisma } from "@/utils/connect";
import { calculatePastDate } from "@/utils/getPostsFromTheLastSevenDays";
import { Post, User } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { page } = req.body;
  const posts = await getAdditionalPostsForGuestTimeline(page);
  if (!posts.success) {
    return res.status(404).json({ success: false, message: posts.message });
  }

  return res
    .status(200)
    .json({ success: posts.success, message: posts.message });
}
