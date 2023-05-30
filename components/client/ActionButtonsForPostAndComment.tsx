"use client";

import { store } from "@/zustand/store";

export default function ActionButtonsForPostAndComment({
  uid,
  post,
  comment,
}: {
  uid: string;
  post?: any;
  comment?: any;
}) {
  const { setEditPost, setReplyToUser, setEditReply } = store();

  return (
    <>
      {/* //* If it's a post that is passed in and the post author id is the same person logged in, allow them to edit */}
      {post && uid === post.user.id && (
        <button
          onClick={() =>
            setEditPost({
              toggle: true,
              postId: post.id,
              postContent: post.content,
            })
          }
        >
          Edit
        </button>
      )}
      {post && uid !== post.user.id && (
        <button
          onClick={() =>
            setReplyToUser({
              toggle: true,
              postId: post.id,
              channel: post.channel,
              replyContent: post.content,
              replyingTo: post.user.username,
            })
          }
        >
          Reply
        </button>
      )}
      {comment && uid === comment.user.id && (
        <button
          onClick={() =>
            setEditReply({
              toggle: true,
              commentId: comment.id,
              commentContent: comment.content,
            })
          }
        >
          Edit
        </button>
      )}
      {comment && uid !== comment.user.id && (
        <button
          onClick={() =>
            setReplyToUser({
              toggle: true,
              postId: comment.id,
              channel: comment.channel,
              replyContent: comment.content,
              replyingTo: comment.user.username,
            })
          }
        >
          Reply
        </button>
      )}
    </>
  );
}
