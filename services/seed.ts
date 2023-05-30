import { prisma } from "@/utils/connect";

type User = {
  id?: string;
  email: string;
  username: string;
};

const users: User[] = [
  {
    email: "rgioeli@icloud.com",
    username: "rgioeli",
  },
  {
    email: "brittanygioeli90@gmail.com",
    username: "bframe2",
  },
  {
    email: "juliangioeli@gmail.com",
    username: "jujubee16",
  },
  {
    email: "avagioeli@gmail.com",
    username: "avawavie",
  },
];

export const seedData = () => {
  return prisma.user.createMany({
    data: users,
  });
};
