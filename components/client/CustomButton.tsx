"use client";

import { signIn, signOut } from "next-auth/react";
import Spacer from "../helpers/Spacer";

export default function CustomButton({
  text,
  additionalStyling,
  type,
  inverted,
  addedIcon,
  disabled,
  handleClick,
  auth,
}: {
  text: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset" | undefined;
  inverted?: boolean;
  additionalStyling?: string;
  auth?: { login: boolean; provider?: string };
  addedIcon?: any;
  handleClick?: () => void;
}) {
  const classFormattingForTailwindcss = () => {
    let str: string = "";
    if (addedIcon) {
      str += "flex items-center space-x-3 ";
    }

    if (inverted) {
      str +=
        "bg-white text-[#4b9599] border-2 border-[#5ebbc0] hover:bg-gradient-to-r from-[#5ebbc0] to-[#4b9599] hover:text-white hover:shadow-md ";
    }

    if (!inverted) {
      str += "bg-gradient-to-r from-[#5ebbc0] to-[#4b9599] text-white ";
    }

    if (disabled) {
      str += "bg-gradient-to-r from-slate-500 to-slate-800 ";
    }

    str += "cursor-pointer px-3 py-3 rounded-md max-w-max ";

    return str;
  };
  return (
    <button
      type={type}
      disabled={disabled}
      className={`${classFormattingForTailwindcss()} flex items-center ${additionalStyling}`}
      onClick={() => {
        if (auth) {
          if (auth.login) {
            signIn(auth.provider, { callbackUrl: "/dashboard/timeline" });
          } else {
            signOut();
          }
        } else if (handleClick) {
          handleClick;
        } else {
          return null;
        }
      }}
    >
      {addedIcon && <span>{addedIcon}</span>}
      <Spacer margin="mx-1" />
      {text}
    </button>
  );
}
