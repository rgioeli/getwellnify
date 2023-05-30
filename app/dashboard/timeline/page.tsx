import posts from "../../../posts.json";

import { validateSearchTerm } from "@/utils/validateSearchTerm";

import { Suspense } from "react";
import { getInitialRelatedChannelPosts } from "@/services/getInitialRelatedChannelPosts";
import NotFound from "@/components/NotFound";
import SetShowChannelMenu from "@/components/client/state-setters-only/SetShowChannelMenu";
import { isAuthenticated } from "@/services/helpers/isAuthenticated";
import Post from "@/components/client/Post";

//todo: Get post data from an actual API and render it out on the timeline

export const revalidate = 60;

type SearchParams = {
  searchParams: {
    channel?: string;
  };
};

type UserType = {
  id: string;
  image: string;
  username: string;
};

async function getRelatedChannelPosts(
  channel: string | undefined
): Promise<any[] | undefined> {
  const response = await getInitialRelatedChannelPosts(channel);
  return response;
}

//* Dashboard page - three column layout
export default function Page({ searchParams }: SearchParams) {
  //* Check if the search term that was searched for is a legit search term allowed
  //* If it's NOT a legit search term, then just show the generic timeline
  //* If it's IS a legit search term, show the channel associated with that search term
  return validateSearchTerm(searchParams.channel).then(async (res) => {
    if (res) {
      const { id } = await isAuthenticated();
      console.log("From Page ID, ", id);
      //* If the term exists, find 10 posts related to the search term here.
      const posts = await getRelatedChannelPosts(searchParams.channel);
      // const posts = [
      //   {
      //     id: "clhzh2t3p000auyi0pcqzo9ll",
      //     user: {
      //       id: "clhx3j4cl0004uyv01mewv9qp",
      //       username: "user-d5f3f227",
      //       image: "/avatars/a3.PNG",
      //     },
      //     content: "We are now writing another post.",
      //     updatedAt: new Date("2023-05-22T23:08:59.379Z"),
      //     channel: "Mental state - altered",
      //     likesCount: 0,
      //     replyCount: 0,
      //   },
      //   {
      //     id: "clhzgzu5s0008uyi0t80394hi",
      //     user: {
      //       id: "clhx3j4cl0004uyv01mewv9qp",
      //       username: "user-d5f3f227",
      //       image: "/avatars/a3.PNG",
      //     },
      //     content:
      //       "So i've recently had a lot of trouble with my mental state. It's affecting me at work and everyone around me is just blaming me for things that aren't even my fault. I don't know whether to find a new job or talk to the boss about it because even he makes it to be like my fault sometimes.",
      //     updatedAt: new Date("2023-05-22T23:08:59.379Z"),
      //     channel: "Mental state - altered",
      //     likesCount: 0,
      //     replyCount: 0,
      //   },
      //   {
      //     id: "clhzgzu5s0008uyi0t8jem4hi",
      //     user: {
      //       id: "clhx3j4cl0004uyv01mewv9qp",
      //       username: "user-d5f3f227",
      //       image: "/avatars/a3.PNG",
      //     },
      //     content: "and again",
      //     updatedAt: new Date("2023-05-22T23:08:59.379Z"),
      //     channel: "Mental state - altered",
      //     likesCount: 0,
      //     replyCount: 0,
      //   },
      //   {
      //     id: "clhzgzlme0006uyi0xwls7m9s",
      //     user: {
      //       id: "clhx3j4cl0004uyv01mewv9qp",
      //       username: "user-d5f3f227",
      //       image: "/avatars/a3.PNG",
      //     },
      //     content: "New post coming in",
      //     updatedAt: new Date("2023-05-22T23:08:59.379Z"),
      //     channel: "Mental state - altered",
      //     likesCount: 0,
      //     replyCount: 0,
      //   },
      //   {
      //     id: "clhzglieq0004uyi0la4t7ops",
      //     user: {
      //       id: "clhx3j4cl0004uyv01mewv9qp",
      //       username: "user-d5f3f227",
      //       image: "/avatars/a3.PNG",
      //     },
      //     content: "I'm going to end up killin' ya!",
      //     updatedAt: new Date("2023-05-22T23:08:59.379Z"),
      //     channel: "Mental state - altered",
      //     likesCount: 0,
      //     replyCount: 0,
      //   },
      //   {
      //     id: "clhzdhbcy0002uyi0e5tuph0y",
      //     user: {
      //       id: "clhx3j4cl0004uyv01mewv9qp",
      //       username: "user-d5f3f227",
      //       image: "/avatars/a3.PNG",
      //     },
      //     content: "I have mental states that get altered a LOT!",
      //     updatedAt: new Date("2023-05-22T23:08:59.379Z"),
      //     channel: "Mental state - altered",
      //     likesCount: 0,
      //     replyCount: 0,
      //   },
      // ];

      //* If the channel is valid BUT there are no posts in the channel
      return posts && !posts.length ? (
        <div>
          {/* //* This client component is exclusively for setting the showMenu state so the <CreateAPost /> button & menu renders */}
          <SetShowChannelMenu channel={searchParams.channel} />
          <NotFound
            text="There are no posts yet on this topic. Create a post to start the
            conversation!"
          />
        </div>
      ) : (
        //* If the channel is valid AND there are posts in the channel
        <div>
          <SetShowChannelMenu channel={searchParams.channel} />
          {posts?.length && posts.map((post) => <Post post={post} uid={id} />)}
        </div>
      );
    } else {
      //* If the channel name isn't valid OR there is no channel search parameter
      //* then we are going to render out a default timeline that is suited for the user
      return (
        <div className="px-3 border-x-2 border-slate-200">
          <Suspense fallback={<p>Loading Timeline</p>}>
            {/* //* <DashboardTimeline /> */}
            <div className="">
              <p>
                This is the generic timeline of preferred interests for the user
              </p>
            </div>
          </Suspense>
          <p>What is here?</p>
        </div>
      );
    }
  });
}
