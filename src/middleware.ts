import { withAuth } from "@kinde-oss/kinde-auth-nextjs/middleware";

export default withAuth(async function middleware() {}, {
  isReturnToCurrentPage: true,
});

export const config = {
  matcher: ["/dashboard", "/dashboard/:path*"],
};
