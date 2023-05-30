import { isAuthenticatedApiRoute } from "@/services/helpers/isAuthenticatedApiRoute";
import { NextApiRequest, NextApiResponse } from "next";
import { likeAPostOrComment } from "../../../services/likeAPostOrComment";
import { prisma } from "@/utils/connect";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    //todo: Like a comment
    const { commentId } = req.body;
    const { success, message } = await isAuthenticatedApiRoute(req, res);

    if (!success) {
      //! if a user is not logged in
      throw {
        statusCode: 401,
        message,
      };
    }

    //* get user id
    const uid = success.id;

    //! if we are missing resources on req.body
    if (!commentId) {
      throw {
        statusCode: 404,
        message: "Resources required were not provided.",
      };
    }
    //todo: We need to make sure the person liking the post hasn't already liked it.
    //todo: If the person has liked it, set action to DELETE, if they haven't liked it, set action to COMMIT
    let actionResponse = await prisma.like.findUnique({
      where: {
        userId_commentId: {
          commentId,
          userId: uid,
        },
      },
    });

    let action: "COMMIT" | "DELETE";

    if (!actionResponse) {
      action = "COMMIT";
    } else {
      action = "DELETE";
    }

    const response = await likeAPostOrComment({ uid, action, commentId });

    console.log(response);

    res
      .status(200)
      .json({ success: response?.success, message: response?.message });

    return;
  } catch (e) {
    const error = e as { statusCode: number; message: string };
    return res
      .status(error.statusCode)
      .json({ success: false, message: error.message });
  }
}
