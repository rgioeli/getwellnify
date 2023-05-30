import { prisma } from "@/utils/connect";

export const getInitialRelatedChannelPosts = async (
  channel: string | undefined
) => {
  try {
    if (!channel) throw new Error("Channel is undefined");
    return await prisma.post.findMany({
      where: {
        channel,
      },
      select: {
        id: true,
        user: {
          select: {
            id: true,
            username: true,
            image: true,
          },
        },
        content: true,
        createdAt: true,
        updatedAt: true,
        channel: true,
        likesCount: true,
        replyCount: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 10,
    });
  } catch (e) {
    const error = e as Error;
    console.log(error.message);
  }
};
