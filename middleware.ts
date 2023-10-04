import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/sign-in",
  },
});

export const config = { 
  matcher: [
    "/conversations/:path*",
    "/servers/:path*",
    "/",
    "/search/:path*",
    "/courses/:path*",
    "/teamchat/:path*"
  ]
};
