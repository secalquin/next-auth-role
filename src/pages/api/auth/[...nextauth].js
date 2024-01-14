import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  callbacks: {
    session: async ({ session, token, user }) => {
      session.accessToken = token.accessToken;
      return session;
    },
    jwt: async ({ user, token }) => {
      if (user) {
        const getUser = await prisma.user.findUnique({
          where: {
            id: user.id,
          },
          include: {
            role: true,
          },
        });

        token.user = getUser;
      }
      return token;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60, // 24 hours
    updateAge: 24 * 60 * 60, // 24 hours
  },
});
