import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

type UserType = {
  id: string;
  image: string;
  username: string;
};

export const isAuthenticated = async () => {
  const session = await getServerSession(authOptions);
  const user = session as unknown as UserType;
  return { id: user.id, image: user.image, username: user.username };
};
