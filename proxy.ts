import { auth, clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

import { NextResponse } from "next/server";

export default clerkMiddleware(async (auth, req) => {
  const isProtectedRoute = createRouteMatcher(["/admin(.*)"]);

  if (isProtectedRoute(req)) await auth.protect();
  const isAdminRoute = createRouteMatcher(["/admin(.*)"]);
  const { userId } = await auth();
  const isAdminUser = userId === process.env.ADMIN_USER_ID;
  if (isAdminRoute(req) && !isAdminUser) {
    return NextResponse.redirect(new URL("/", req.url));
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
