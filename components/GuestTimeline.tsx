import { prisma } from "@/utils/connect";
import PostTemplate from "./PostTemplate";
import { Post, User } from "@prisma/client";
import data from "../posts.json";
import GetMorePostsOnGuestTimeline from "./client/GetMorePostsOnGuestTimeline";
import { calculatePastDate } from "@/utils/getPostsFromTheLastSevenDays";

async function getRecentPosts() {
  const entriesToTake = 10;
  const daysAgo = 7;
  const postsWithinLastSevenDays = calculatePastDate(daysAgo);
  const posts = await prisma.post.findMany({
    where: {
      createdAt: {
        gte: postsWithinLastSevenDays,
      },
    },
    include: { user: true },
    take: entriesToTake,
  });

  return posts;
}

//* Grab some posts and display them here
export default async function GuestTimeline() {
  //todo: Make sure to comment out posts and uncomment the one below so we're using real data during production
  // const posts: (Post & { user: User })[] = await getRecentPosts(); //! This is the real data
  const posts = data; //! This is mock data
  return (
    <div>
      {posts ? posts.map((x) => <PostTemplate post={x} />) : <p>No Results</p>}
      <GetMorePostsOnGuestTimeline />
    </div>
  );
}
