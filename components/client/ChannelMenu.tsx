"use client";

import { BsPencil } from "react-icons/bs";
import CustomButton from "./CustomButton";
import { store } from "@/zustand/store";

export default function ChannelMenu() {
  //* We need to set the toggleCreatePost when we click on the button below

  //zustand
  const { showChannelMenu, setToggleCreatePost } = store();

  return showChannelMenu.toggle ? (
    <div className="max-w-max">
      <div
        onClick={() =>
          setToggleCreatePost({
            channel: showChannelMenu.channel,
            toggle: true,
          })
        }
      >
        <CustomButton
          disabled={false}
          text="Create Post"
          type="button"
          additionalStyling="py-1"
          addedIcon={<BsPencil size={18} color={"#fff"} />}
        />
      </div>
    </div>
  ) : (
    <></>
  );
}
