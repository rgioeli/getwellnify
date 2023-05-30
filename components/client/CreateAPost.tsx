"use client";

import { store } from "@/zustand/store";
import { useRef, useState, useEffect } from "react";
import Spacer from "../helpers/Spacer";
import CustomButton from "./CustomButton";
import { BsSend } from "react-icons/bs";
import { useFetchNextApi } from "@/hooks/useFetchNextApi";

export default function CreateAPost() {
  //zustand
  const { toggleCreatePost, setToggleCreatePost } = store();

  //usestate
  const [controller] = useState(new AbortController());

  //useref
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const { data, error, loading, execute } = useFetchNextApi(
    "/api/post/create-post",
    {
      signal: controller.signal,
      method: "POST",
      headers: { "Content-type": "application/json" },
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
      content: textareaRef.current?.value,
      channel: toggleCreatePost.channel,
    });
  };

  useEffect(() => {
    if (data.success) {
      setToggleCreatePost({ channel: null, toggle: false });
    }
  }, [data]);

  useEffect(() => {
    return () => {
      console.log("Is this signal being ran?");
      return controller.abort();
    };
  }, []);

  return (
    toggleCreatePost.toggle && (
      <div className="flex justify-end absolute top-0 right-0 z-20 w-full h-full bg-slate-500/50">
        <div className="h-full bg-white w-full md:w-2/3 lg:w-1/2 p-3 border-l-2 border-[#5ebbc0]">
          <p
            className="text-sm cursor-pointer max-w-max"
            onClick={() =>
              toggleCreatePost.channel &&
              setToggleCreatePost({
                channel: toggleCreatePost.channel,
                toggle: false,
              })
            }
          >
            Back to timeline 🏃‍♂️
          </p>
          <Spacer margin={"py-1"} />
          <form
            className="flex flex-col items-end justify-center"
            onSubmit={handleSubmit}
          >
            <textarea
              className="w-full resize-none outline-none rounded-md p-1 text-slate-600 border-2 border-[#5ebbc0]"
              placeholder={`Writing in the ${toggleCreatePost.channel} forum`}
              rows={6}
              ref={textareaRef}
              onChange={handleChange}
            ></textarea>
            <Spacer margin="mt-1" />
            <CustomButton
              disabled={loading}
              text="Send"
              addedIcon={<BsSend />}
              type="submit"
            />
          </form>
        </div>
      </div>
    )
  );
}
