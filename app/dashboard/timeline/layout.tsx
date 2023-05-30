import SearchBar from "@/components/client/SearchBar";
import Spacer from "@/components/helpers/Spacer";
import { isAuthenticatedOrRedirected } from "@/services/helpers/isAuthenticatedOrRedirected";

export const metadata = {
  title: "Wellnify | Timeline",
  description: "Wellnify timeline is where the latest posts and interests are.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  //todo: Make next-auth take over this part. This is just a fill-in to simulate a user logged in.
  await isAuthenticatedOrRedirected();

  return (
    <div className="overflow-y-auto relative">
      {/* //* This <div> is the background image that sits at bottom on desktop*/}
      <div className="bg-pageBackground absolute bottom-0 -left-80 bg-no-repeat z-0 bg-cover h-1/3 w-1/3"></div>
      <SearchBar />
      <h5 className="text-lg font-medium py-3">Timeline</h5>
      <Spacer margin="my-6" />
      <div className="h-full">{children}</div>
    </div>
  );
}
