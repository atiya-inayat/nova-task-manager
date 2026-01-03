// protect multiple routes at once

// What it means: you are telling Next.js to use NextAuth’s built-in middleware for handling authentication on certain routes.
// Middleware in Next.js runs before the request reaches your page, so it can:
// Check if a user is logged in - Redirect to login page if not - Attach the session info to the request

import withAuth from "next-auth/middleware";
export default withAuth({
  pages: {
    signIn: "/auth/signin", // redirect here if not authorized
  },
});

export const config = {
  // matcher tells Next.js which routes this middleware should run on.
  matcher: "/dashboard/:path*", // Here, the middleware will run on any route that matches /dashboard/....
};
