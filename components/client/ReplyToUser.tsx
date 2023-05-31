"use client";

import { store } from "@/zustand/store";
import { useRef, useState, useEffect } from "react";
import CustomButton from "./CustomButton";
import { BsSend } from "react-icons/bs";
import Spacer from "../helpers/Spacer";
import { useFetchNextApi } from "@/hooks/useFetchNextApi";

export default function ReplyToUser() {
  const { setReplyToUser, replyToUser } = store();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [controller] = useState(new AbortController());

  const { data, error, loading, execute } = useFetchNextApi(
    "/api/post/create-reply",
    {
      headers: { "Content-type": "application/json" },
      method: "POST",
      signal: controller.signal,
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (textareaRef.current) {
      textareaRef.current.value = e.target.value;
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log("REPLY TO USER", replyToUser);
    e.preventDefault();
    execute({
      postId: replyToUser.postId,
      content: textareaRef.current?.value,
      channel: replyToUser.channel,
      parentId: replyToUser.parentId,
    });
  };

  useEffect(() => {
    if (data.success) {
      setReplyToUser({
        toggle: false,
        postId: undefined,
        channel: undefined,
        replyContent: undefined,
        replyingTo: undefined,
      });
    }
  }, [data]);

  useEffect(() => {
    return () => controller.abort();
  }, []);

  return (
    replyToUser.toggle && (
      <div className="flex justify-end fixed top-0 right-0 z-20 w-full h-screen bg-slate-500/50">
        <div className="h-full bg-white w-full md:w-2/3 lg:w-1/2 p-3 border-l-2 border-[#5ebbc0]">
          <p
            className="text-sm cursor-pointer max-w-max py-3"
            onClick={() =>
              setReplyToUser({
                toggle: false,
                channel: undefined,
                postId: undefined,
                replyingTo: undefined,
                replyContent: undefined,
              })
            }
          >
            Back to timeline 🏃‍♂️
          </p>
          <form className="flex flex-col gap-y-3" onSubmit={handleSubmit}>
            <p className="font-medium">
              {replyToUser.replyingTo?.username} wrote:
            </p>
            <div className="bg-gradient-to-b from-white/0 to-slate-100/100 relative z-10 p-3 rounded-md shadow-sm overflow-y-auto">
              <p className="max-h-40 text-slate-500">
                {replyToUser.replyContent}
              </p>
            </div>
            <textarea
              className="w-full resize-none outline-none rounded-md p-1 text-slate-600 border-2 border-[#5ebbc0]"
              rows={6}
              title="Reply to User"
              ref={textareaRef}
              onChange={handleChange}
              placeholder={`Replying to ${replyToUser.replyingTo?.username}`}
            ></textarea>
            <CustomButton
              disabled={loading}
              text="Submit Reply"
              addedIcon={<BsSend size={21} />}
              type="submit"
            />
          </form>
        </div>
      </div>
    )
  );
}
