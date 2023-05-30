import Link from "next/link";

type MenuOption = {
  href: string;
  text: string;
  icon: any;
};

export default function MenuOption({ href, text, icon }: MenuOption) {
  return (
    <li className="flex items-center justify-between space-x-3">
      <span>{icon}</span>
      <Link className="text-xl hover:text-slate-950" href={href}>
        {text}
      </Link>
    </li>
  );
}
