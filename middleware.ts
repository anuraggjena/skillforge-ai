import { clerkMiddleware, createRouteMatcher, clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { getUserById, createUserInDb } from "@/lib/actions/user.actions";

const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
]);

const isPublicAuthOrLandingRoute = createRouteMatcher([
  '/',
  '/sign-in(.*)',
  '/sign-up(.*)',
]);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();

  // If the user is signed in
  if (userId) {
    // Redirect away from landing page, sign-in, and sign-up pages to dashboard
    const isSSOCallback = req.nextUrl.pathname.includes('/sso-callback');
    if (isPublicAuthOrLandingRoute(req) && !isSSOCallback) {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }

    const user = await getUserById(userId);

    // If the user is not found in our DB, this is their first login. Create them.
    if (!user) {
      await createUserInDb(userId);
    }

    return NextResponse.next();
  }

  // If the user is not signed in and tries to access a protected route, redirect them
  if (!userId && isProtectedRoute(req)) {
    const signInUrl = new URL('/sign-in', req.url);
    signInUrl.searchParams.set('redirect_url', req.url);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};