import { PrismaAdapter } from "@auth/prisma-adapter";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import prisma from "./connect";
import { getServerSession } from "next-auth";

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
<<<<<<< HEAD
  secret: process.env.NEXTAUTH_SECRET,
=======
  secret: process.env.NEXTAUTH_SECRET
>>>>>>> 4de40125465ff462b124a64d332f8292f67b5c30
};

export const getAuthSession = () => getServerSession(authOptions);
