import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import { db } from "@/lib/db";
import { Profile } from "@prisma/client";

declare module "next-auth" {
  interface Session {
    user: Profile
  }
}
declare module "next-auth/jwt" {
  interface JWT {
    isAdmin: boolean;
    imageUrl: string;
  }
}

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(db),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        userId: { label: "userId", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.userId || !credentials?.password) {
          throw new Error("Invalid credentials");
        }

        const user = await db.profile.findUnique({
          where: { userId: credentials.userId },
        });

        if (!user) {
          throw new Error("Invalid credentials");
        }

        return user;
      },
    }),
  ],
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.isAdmin = token.isAdmin;
        session.user.imageUrl = token.imageUrl;
      }
      return session;
    },
    async jwt({ token }) {
      const userInDb = await db.profile.findUnique({
        where: { userId: token.email! },
      });
      token.isAdmin = userInDb?.isAdmin!;
      token.imageUrl = userInDb?.imageUrl!;
      return token;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
