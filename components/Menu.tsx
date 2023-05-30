import { RiComputerFill, RiNewspaperFill } from "react-icons/ri";
import MenuOption from "./MenuOption";
import CustomButton from "./client/CustomButton";
import {
  BsDoorClosed,
  BsFillEnvelopePaperFill,
  BsWrenchAdjustableCircleFill,
} from "react-icons/bs";
import { haveASession } from "@/utils/haveASession";

export default function Menu() {
  const size = 21;
  const color = "#444";
  return (
    <nav className="flex flex-col items-start justify-start mt-6">
      <ul className="flex flex-col justify-start mr-3 w-50">
        <MenuOption
          href="/dashboard"
          text="Dashboard"
          icon={<RiComputerFill size={size} color={color} />}
        />
        <MenuOption
          href="/dashboard/timeline"
          text="Timeline"
          icon={<RiNewspaperFill size={size} color={color} />}
        />
        <MenuOption
          href="/dashboard/messages"
          text="Messages"
          icon={<BsFillEnvelopePaperFill size={size} color={color} />}
        />
        <div className="mt-6"></div>
        <MenuOption
          href="/dashboard/user/account"
          text="Account"
          icon={<BsWrenchAdjustableCircleFill size={size} color={color} />}
        />
      </ul>
      <div className="mt-3">
        <CustomButton
          text="Logout"
          addedIcon={<BsDoorClosed size={size} />}
          auth={{ login: false, provider: undefined }}
        />
      </div>
    </nav>
  );
}
