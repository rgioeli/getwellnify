import { BsArrow90DegUp, BsChatDots, BsHeart } from "react-icons/bs";
import { Post } from "@prisma/client";
import Image from "next/image";
import LoaderSpinner from "./LoaderSpinner";
import TimePassed from "../helpers/TimePassed";
import ActionButtonsForPostAndComment from "./ActionButtonsForPostAndComment";

type PostType = {
  post: Post & { user: { id: string; image: string; username: string } };
  loading: boolean;
  execute: ({
    parentId,
    postId,
  }: {
    parentId: string | undefined;
    postId: string | undefined;
  }) => void;
  children: JSX.Element;
  showingReplies: boolean;
  setShowingReplies: (toggle: any) => void;
  comments: any[];
  uid: string;
};

export default function PostTemplate({
  post,
  execute,
  children,
  loading,
  showingReplies,
  setShowingReplies,
  comments,
  uid,
}: PostType) {
  //* When we "Hide Replies", we don't want to show the same chat dots icon that fetches comments 'IF' we have comments.
  //* - We want to show a chat dots button that just toggles the display of the content
  return (
    <div
      className={`${
        uid === post.user.id &&
        "bg-gradient-to-r from-[#eef8f8] to-[#ceeaec] rounded-md rounded-l-none"
      } flex p-3 mt-3`}
    >
      <div className="flex p-3 w-full">
        <div className="pr-3 rounded-full">
          <Image
            src={post.user.image}
            width={48}
            height={48}
            alt={"pfp"}
            className="rounded-full"
          />
        </div>
        <div className="w-full">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <p className="font-medium">{post.user.username}</p>
              <TimePassed date={post.createdAt} />
            </div>
            <p className="text-xs">{post.channel}</p>
          </div>
          <section>
            <p>{post.content}</p>
          </section>
          <div className="flex space-x-3 pt-6">
            <div className="flex items-center space-x-1 relative top-0.5">
              <BsHeart size={21} />
              <span>{post.likesCount}</span>
            </div>
            {!showingReplies && comments.length ? (
              <div
                onClick={() => setShowingReplies(true)}
                className="flex items-center space-x-1 cursor-pointer"
              >
                <BsChatDots size={21} />
                <span>{post.replyCount}</span>
              </div>
            ) : !showingReplies && !comments.length ? (
              <div
                onClick={() =>
                  execute({ parentId: undefined, postId: post.id })
                }
                className="flex items-center space-x-1 cursor-pointer"
              >
                <BsChatDots size={21} />
                <span>{post.replyCount}</span>
              </div>
            ) : comments.length ? (
              <div
                onClick={() => setShowingReplies(false)}
                className="space-x-1 flex items-center cursor-pointer text-sm"
              >
                <button>Hide Replies</button>
                <BsArrow90DegUp size={15} />
              </div>
            ) : (
              <div
                onClick={() =>
                  execute({ parentId: undefined, postId: post.id })
                }
                className="flex items-center space-x-1 cursor-pointer"
              >
                <BsChatDots size={21} />
                <span>{post.replyCount}</span>
              </div>
            )}
            <ActionButtonsForPostAndComment post={post} uid={uid} />
          </div>
          {loading ? (
            <LoaderSpinner text="Loading comments" />
          ) : showingReplies ? (
            children
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}
