import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/",
  },
});

export const config = { 
  matcher: [
    "/conversations/:path*",
    "/servers/:path*",
    "/main",
    "/search/:path*",
    "/courses/:path*",
    "/teamchat/:path*"
  ]
};
