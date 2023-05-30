import { prisma } from "@/utils/connect";
import { calculatePastDate } from "@/utils/getPostsFromTheLastSevenDays";

export const getAdditionalPostsForGuestTimeline = async (page: number) => {
  const entriesToTake = 10;
  const daysAgo = 7;
  const postsWithinLastSevenDays = calculatePastDate(daysAgo);
  try {
    const posts = await prisma.post.findMany({
      where: {
        createdAt: {
          gte: postsWithinLastSevenDays,
        },
      },
      include: { user: true },
      take: entriesToTake,
      skip: entriesToTake * page,
    });
    console.log("POSTS => ", posts);
    if (posts.length == 0) {
      throw new Error(`Error: Could not find posts from ${daysAgo} days ago.`);
    }

    return { success: posts, message: "Found posts." };
  } catch (e) {
    const error = e as Error;
    return { success: false, message: error.message };
  }
};
