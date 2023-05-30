import { Session, getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export const haveASession = async (): Promise<Session | null> => {
  return await getServerSession(authOptions);
};
