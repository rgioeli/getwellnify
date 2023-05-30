import Image from "next/image";
import NotFoundImage from "@/public/not-found/magnify-glass.png";

export default function NotFound({ text }: { text: string }) {
  return (
    <div className="flex flex-col space-y-3 mt-6 items-center justify-center">
      <p className="w-1/2 font-medium text-center">{text}</p>
      <Image
        alt="Not found"
        src={NotFoundImage}
        width={150}
        height={150}
        className="rounded-full"
      />
    </div>
  );
}
