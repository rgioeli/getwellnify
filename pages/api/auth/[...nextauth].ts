import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/utils/connect";
import { getRandomAvatar } from "@/utils/createRandomAvatar";
import { v4 as uuid } from "uuid";

type UserType = {
  id: string;
  image: string;
  username: string;
};

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  events: {
    async createUser({ user }) {
      const addUsernameAndAvatar = async () => {
        console.log(user);
        const avatar = getRandomAvatar();
        const username = "user-" + uuid();
        if (!user.email) return;
        await prisma.user.update({
          where: {
            email: user.email,
          },
          data: {
            image: avatar,
            username,
          },
        });
      };

      return await addUsernameAndAvatar();
    },
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    // ...add more providers here
  ],
  callbacks: {
    async session({ session, user }): Promise<any> {
      let newSession: UserType;
      if (session && user) {
        const { id, username, image } = user as unknown as UserType;
        newSession = { id, username, image } as UserType;
        return newSession;
      }

      return null;
    },
  },
};
export default NextAuth(authOptions);
