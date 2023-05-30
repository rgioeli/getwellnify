import { NextPage } from "next";
import { Post, User } from "@prisma/client";
import Image from "next/image";
import Avatar from "@/public/post-assets/avatar.png";
import { dateToElapsedTimeAgo } from "@/utils/dateToElapsedTime";
import { PostTemplateType } from "@/types/PostTemplateType";

const PostTemplate: NextPage<PostTemplateType> = ({ post }) => {
  return (
    <div className="w-full py-6 border-b-2 border-slate-200">
      {/* //*This is the inner-wrapper for the post that has doesn't include a border */}
      <div className="flex">
        {/* //* Image wrapper (left column of post) */}
        <div className="pr-3">
          <Image
            src={Avatar}
            width={50}
            height={50}
            className="rounded-full self-start"
            alt={`profile picture for ${post?.user?.username}`}
          />
        </div>
        {/* //*Header of the post */}
        <div className="flex flex-col w-full">
          {/* //* Username and @name and channel */}
          <div className="flex justify-between items-center">
            {/* //* Username and elapsed time */}
            <div className="flex items-center space-x-3">
              <p className="text-lg font-medium">{post?.user?.username}</p>
              <p className="text-slate-500">
                {dateToElapsedTimeAgo(post.updatedAt)}
              </p>
            </div>
            <p className="text-sm text-slate-500">{post.channel}</p>
          </div>
          <div>
            <p>
              {
                (post.content =
                  "Ea tempor labore officia laborum Lorem sunt ipsum tempor amet et enim nostrud labore. Sint Lorem excepteur qui reprehenderit reprehenderit officia irure in voluptate adipisicing irure nisi. Dolore velit proident exercitation tempor dolore irure reprehenderit.")
              }
            </p>
          </div>
          {/* //*Left side of the post header */}
          <div className="flex"></div>
        </div>
      </div>
    </div>
  );
};

export default PostTemplate;
