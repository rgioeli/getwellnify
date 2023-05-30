import { NextApiRequest, NextApiResponse } from "next";
import { seedData } from "@/services/seed";
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return seedData().then((data) => {
    return res.status(200).json({ success: data });
  });
}
