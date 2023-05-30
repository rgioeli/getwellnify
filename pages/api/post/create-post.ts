import { prisma } from "@/utils/connect";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

type UserType = {
  id: string;
  image: string;
  username: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // body
  const { content, channel } = req.body;
  const bod = req.body;

  console.log(content, channel);

  console.log("Body =>", bod);

  //session
  const session = (await getServerSession(req, res, authOptions)) as UserType;

  console.log(session);

  if (!content || !channel)
    return res.status(400).json({
      success: false,
      message: "No body!",
    });

  prisma.post
    .create({
      data: {
        content: content,
        user: {
          connect: {
            id: session.id,
          },
        },
        channel,
      },
      select: {
        user: {
          select: {
            id: true,
            username: true,
          },
        },
        content: true,
        createdAt: true,
        updatedAt: true,
      },
    })
    .then((data) => {
      if (!data) {
        throw new Error("No data came back from the server.");
      }

      return res.status(200).json({
        success: data,
        message: "Post creation successful",
      });
    })
    .catch((error) => {
      return res.status(404).json({ success: false, message: error.message });
    });
}
