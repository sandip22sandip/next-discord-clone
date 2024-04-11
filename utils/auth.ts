import NextAuth, { AuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import { db } from "@/lib/db";
import { User } from "@prisma/client";

import authConfig from "@/utils/auth.config";

declare module "next-auth" {
  interface Session {
    user: User;
  }
}
declare module "next-auth/jwt" {
  interface JWT {
    isAdmin: boolean;
    image: string;
  }
}

export const authOptions: AuthOptions = {
  callbacks: {
    async jwt({ token }) {
      const userInDb = await db.user.findUnique({
        where: { email: token.email! },
      });
      token.isAdmin = userInDb?.isAdmin!;
      token.image = userInDb?.image!;
      return token;
    },
    async session({ token, session }) {
      if (token) {
        session.user.isAdmin = token.isAdmin;
        session.user.image = token.image;
      }
      return session;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
