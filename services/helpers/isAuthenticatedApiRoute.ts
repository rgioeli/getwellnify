import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { UserType } from "@/types/UserType";

export const isAuthenticatedApiRoute = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<{ success: UserType | false; message: string }> => {
  const session = await getServerSession(req, res, authOptions);
  if (!session)
    return { success: false, message: "User could not be authorized" };
  return {
    success: session as unknown as UserType,
    message: "User found in session",
  };
};
