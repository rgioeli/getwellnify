import Link from "next/link";
import posts from "../../posts.json";
import PostTemplateWithInteractivity from "@/components/PostTemplateWithInteractivity";
import MenuOption from "@/components/MenuOption";
import Logo from "@/components/assets/Logo";
import { BsHouseFill } from "react-icons/bs";
import Menu from "@/components/Menu";
import { Suspense } from "react";
import CustomButton from "@/components/client/CustomButton";

//* Dashboard page - three column layout
export default function Page() {
  //todo: Put a journal in here that can either be public or private to share experiences with others
  return (
    <div className="px-3 border-x-2 border-slate-200">
      <p>This is the dashboard</p>
    </div>
  );
}

/* <div className="">
      <div className="">
        {posts &&
          posts.map((post) => <PostTemplateWithInteractivity post={post} />)}
      </div>
    </div> */
