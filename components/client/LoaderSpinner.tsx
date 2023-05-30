import { Oval } from "react-loader-spinner";

//* Adds a loading spinner
export default function LoaderSpinner({
  text,
  size = 21,
}: {
  text?: string;
  size?: number;
}) {
  return (
    <div className="flex flex-col justify-center w-full mt-6 items-center">
      <p className="text-slate-500">{text}</p>
      <Oval width={size} height={size} color={"#5ebbc0"} />
    </div>
  );
}
