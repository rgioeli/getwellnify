"use client";

import { store } from "@/zustand/store";
import { BsReply, BsTrash2Fill } from "react-icons/bs";

export default function ActionButtonsForPostAndComment({
  uid,
  post,
  comment,
}: {
  uid: string;
  post?: any;
  comment?: any;
}) {
  const { setEditPost, setReplyToUser, setEditReply, setDeleteModal } = store();
  return (
    <div className="flex items-center justify-between w-full">
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
          className="text-sm"
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
          className="text-sm"
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
          className="text-sm"
        >
          Edit
        </button>
      )}
      {comment && uid != comment.user.id && (
        <div
          className="flex items-center space-x-1 cursor-pointer"
          onClick={() => {
            console.log(comment);
            setReplyToUser({
              toggle: true,
              postId: comment.id,
              channel: comment.channel,
              replyContent: comment.content,
              replyingTo: {
                id: comment.user.id,
                username: comment.user.username,
              },
              parentId: comment.id,
            });
          }}
        >
          <button className="text-sm">Reply</button>
          <BsReply />
        </div>
      )}
      <div>
        {(post && uid == post.user.id) ||
          (comment && uid == comment.user.id && (
            <div
              className="flex items-center space-x-1 cursor-pointer"
              onClick={() => {
                setDeleteModal({
                  id: post
                    ? { postId: post.id, commentId: undefined }
                    : { postId: undefined, commentId: comment.id },
                  toggle: true,
                  text: "Are you sure you want to delete this?",
                });
              }}
            >
              <button className="text-sm text-[#F32013]">Delete</button>
              <BsTrash2Fill color={"#F32013"} />
            </div>
          ))}
      </div>
    </div>
  );
}
