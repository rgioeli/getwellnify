"use client";

import { NextPage } from "next";

import { useState, useEffect } from "react";
import { UserType } from "@/types/UserType";
import { BsChatDots, BsHeart, BsHeartFill } from "react-icons/bs";
import { Post } from "@prisma/client";

import Image from "next/image";
import { dateToElapsedTimeAgo } from "@/utils/dateToElapsedTime";

import { useFetchNextApi } from "@/hooks/useFetchNextApi";
import LoaderSpinner from "./LoaderSpinner";
import PostTemplate from "./PostTemplate";
import TimePassed from "../helpers/TimePassed";
import ActionButtonsForPostAndComment from "./ActionButtonsForPostAndComment";

interface PostType {
  post: Post & { user: UserType };
  uid: string;
}

const Post: NextPage<PostType> = ({ post, uid }) => {
  //todo: Each post needs to have its own comments' state.
  //todo: Each time we click on the 3 dots, we need to get the parentId and display the child comments

  const [comments, setComments] = useState<any[]>([]);
  const [showingReplies, setShowingReplies] = useState<boolean>();

  //* Fetch the next layer of comments based on the parent comment
  //* This will pass in either a parentId or postId
  const { data, loading, error, execute } = useFetchNextApi(
    "/api/post/comments",
    { method: "POST", headers: { "Content-type": "application/json" } }
  );

  useEffect(() => {
    if (data.success) {
      setComments((prevComments) => [...prevComments, ...data.success]);
      setShowingReplies((prevState) => !prevState);
    }
  }, [data]);

  return (
    <div className="border-l-2 border-slate-100">
      <PostTemplate
        uid={uid}
        children={
          <ul className="space-y-4 text-gray-500 list-disc list-inside dark:text-gray-400">
            <CommentList comments={comments} execute={execute} uid={uid} />
          </ul>
        }
        post={post}
        execute={execute}
        loading={loading}
        showingReplies={showingReplies}
        setShowingReplies={setShowingReplies}
        comments={comments}
      />
    </div>
  );
};

function CommentList({
  comments,
  uid,
}: {
  uid: string;
  comments: any[];
  execute: ({
    parentId,
    postId,
  }: {
    parentId: string | undefined;
    postId: string | undefined;
  }) => void;
}) {
  return (
    <>
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} uid={uid} />
      ))}
    </>
  );
}

function Comment({ comment, uid }: { comment: any; uid: string }) {
  //usestate
  const [localComments, setLocalComments] = useState<any[]>([]);
  const [showingReplies, setShowingReplies] = useState<boolean>(false);
  const [heartFilled, setHeartFilled] = useState<boolean>(userLikesComment());
  const [increment, setIncrement] = useState<number>(0);
  const [loadingLikeApi, setLoadingLikeApi] = useState<boolean>(false);

  function userLikesComment() {
    if (comment.Like.length) {
      const userHasAlreadyLikedComment = comment.Like.some(
        (x: { userId: string }) => x.userId === uid
      );
      if (userHasAlreadyLikedComment) {
        return true;
      }
    }

    return false;
  }

  //custom hook
  const { loading, error, data, execute } = useFetchNextApi(
    "/api/post/comments",
    { method: "POST", headers: { "Content-type": "application/json" } }
  );

  const likeComment = async ({ commentId }: { commentId: string }) => {
    setLoadingLikeApi(true);
    const response = await fetch("/api/update/like-comment", {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ commentId }),
    });

    const { success, message } = await response.json();
    if (success) {
      console.log(message);
      if (message.includes("deleted")) {
        setIncrement((prevState) => prevState - 1);
      } else {
        setIncrement((prevState) => prevState + 1);
      }
    }
    setLoadingLikeApi(false);
  };

  //useffect
  useEffect(() => {
    console.log(data);
    if (data.success.length) {
      setLocalComments((prevComments) => [...prevComments, ...data.success]);
      setShowingReplies((prevState) => !prevState);
    }
  }, [data]);

  return (
    <>
      <li
        className={`${
          uid === comment.user.id
            ? "bg-gradient-to-r from-[#eef8f8] to-[#ceeaec]"
            : "bg-white"
        } flex p-3 mt-3 border-l-2 border-slate-100 rounded-md rounded-l-none`}
      >
        <div className="pr-3 rounded-full">
          <Image
            src={comment.user.image}
            width={48}
            height={48}
            alt={"pfp"}
            className="rounded-full"
          />
        </div>
        <div className="w-full">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <p className="font-medium">{comment.user.username}</p>
              <TimePassed date={comment.createdAt} />
            </div>
            <p className="text-xs">{comment.channel}</p>
          </div>
          <section>
            <p>{comment.content}</p>
          </section>
          <div className="flex space-x-3 pt-6">
            {
              <button
                disabled={loadingLikeApi}
                onClick={() => {
                  likeComment({ commentId: comment.id });
                  setHeartFilled((prevState) => !prevState);
                }}
                className="flex items-center space-x-1 relative top-0.5 cursor-pointer"
              >
                {heartFilled ? (
                  <BsHeartFill size={21} color={"#BD0553"} />
                ) : (
                  <BsHeart size={21} />
                )}
                <span>{comment.likesCount + increment}</span>
              </button>
            }
            {/* //* If we are not showing replies but we already have comments */}
            {!showingReplies && !localComments.length ? (
              //todo: not showing replies and no comments yet
              //! Show user the button to get comments
              <div
                onClick={() =>
                  execute({ parentId: comment.id, postId: undefined })
                }
                className="flex items-center space-x-1 cursor-pointer"
              >
                <BsChatDots size={21} />
                <span>{comment.replyCount}</span>
              </div>
            ) : localComments.length ? (
              <div className="flex items-center space-x-1 cursor-pointer">
                <BsChatDots size={21} />
                <span>{comment.replyCount}</span>
              </div>
            ) : null}
            <ActionButtonsForPostAndComment uid={uid} comment={comment} />
          </div>
          {localComments.length ? (
            localComments.map((localComment) => (
              <ul key={localComment.id} className="list-decimal">
                <Comment comment={localComment} uid={uid} />
              </ul>
            ))
          ) : (
            <></>
          )}
        </div>
      </li>
      {loading && <LoaderSpinner text={"Loading comments..."} />}
    </>
  );
}

export default Post;
