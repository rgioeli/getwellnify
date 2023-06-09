import { Roboto } from "next/font/google";
import ".//globals.css";
import CreateAPost from "@/components/client/CreateAPost";
import EditAPost from "@/components/client/EditAPost";
import ReplyToUser from "@/components/client/ReplyToUser";
import EditAComment from "@/components/client/EditAComment";
import DeleteModal from "@/components/client/DeleteModal";

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${roboto.className}  text-slate-600`}>
        {/* //*Children wrapper */}
        <div className="container max-w-6xl mx-auto">{children}</div>
        <CreateAPost />
        <EditAPost />
        <EditAComment />
        <ReplyToUser />
        <DeleteModal />
      </body>
    </html>
  );
}
