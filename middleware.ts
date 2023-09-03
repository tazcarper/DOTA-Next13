export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/dota/:path*", "/dashboard/:path*", "/profile:path*"],
};
