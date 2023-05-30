import { Lobster_Two } from "next/font/google";

const lobster_two = Lobster_Two({
  weight: ["400", "700"],
  subsets: ["latin"],
});

export default function Logo() {
  return (
    <div className="">
      <h3 className={`${lobster_two.className} text-primary text-3xl`}>
        Wellnify
      </h3>
    </div>
  );
}
