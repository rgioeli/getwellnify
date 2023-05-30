"use client";

import { useFetchNextApi } from "@/hooks/useFetchNextApi";
import { store } from "@/zustand/store";
import { useRef, useState, useEffect } from "react";
import CustomButton from "./CustomButton";
import { BsSend } from "react-icons/bs";

export default function EditAComment() {
  //zustand
  const { editReply, setEditReply } = store();
  //usestate
  const [controller] = useState(new AbortController());
  //useref
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const { data, error, loading, execute } = useFetchNextApi(
    "/api/update/edit-comment",
    {
      headers: { "Content-type": "application/json" },
      method: "PUT",
      signal: controller.signal,
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (textareaRef.current) {
      textareaRef.current.value = e.target.value;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    execute({
      commentId: editReply.commentId,
      content: textareaRef.current?.value,
    });
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  useEffect(() => {
    return () => {
      controller.abort();
    };
  }, []);

  return (
    editReply.toggle && (
      <div className="flex justify-end absolute top-0 right-0 z-20 w-full h-full bg-slate-500/50">
        <div className="h-full bg-white w-full md:w-2/3 lg:w-1/2 p-3 border-l-2 border-[#5ebbc0]">
          <p
            className="text-sm cursor-pointer max-w-max py-3"
            onClick={() =>
              setEditReply({
                toggle: false,
                commentId: undefined,
                commentContent: undefined,
              })
            }
          >
            Back to timeline 🏃‍♂️
          </p>
          <form className="flex flex-col gap-y-3" onSubmit={handleSubmit}>
            <textarea
              className="w-full resize-none outline-none rounded-md p-1 text-slate-600 border-2 border-[#5ebbc0]"
              rows={6}
              placeholder=""
              title="Edit Post"
              ref={textareaRef}
              onChange={handleChange}
              defaultValue={editReply.commentContent}
            ></textarea>
            <CustomButton
              text="Submit Edit"
              addedIcon={<BsSend size={21} />}
              type="submit"
            />
          </form>
        </div>
      </div>
    )
  );
}
