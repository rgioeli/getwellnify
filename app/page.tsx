import { Suspense } from "react";
import { BsHouseFill } from "react-icons/bs";
import MenuOption from "@/components/MenuOption";
import Logo from "@/components/assets/Logo";
import CustomButton from "@/components/client/CustomButton";
import GuestTimeline from "@/components/GuestTimeline";
import { redirect } from "next/navigation";
import { haveASession } from "@/utils/haveASession";
import { signIn } from "next-auth/react";

// Rest of your code

export default async function Home() {
  //* Get the user session and redirect user to /dashboard if they are logged in
  console.log("Is it here?");
  const session = await haveASession();
  if (session) return redirect("/dashboard/timeline");

  return (
    <div className="grid grid-cols-dashboard h-screen p-3">
      <div className="border-r-2 border-slate-200">
        <Logo />
        <nav className="flex items-start justify-start mt-6">
          <ul className="flex flex-col justify-start mr-3 w-50">
            <MenuOption href="/" icon={<BsHouseFill size={24} />} text="Home" />
          </ul>
        </nav>
      </div>
      <div className="px-3 border-r-2 border-slate-200">
        <h5 className="text-lg font-medium">Timeline</h5>
        <Suspense fallback={<p>Loading Timeline</p>}>
          <GuestTimeline />
        </Suspense>
      </div>
      <div className="px-3 self-start">
        <div className="border-2 border-slate-200 p-3 rounded-md">
          <h2 className="text-xl font-medium">
            Want to interact with the community?
          </h2>
          <p className="py-3">
            Signup or Login to chat with other users about your health!
          </p>
          <CustomButton
            text="Signup / Login"
            auth={{ login: true, provider: "google" }}
            additionalStyling="w-full"
          />
        </div>
      </div>
    </div>
  );
}
