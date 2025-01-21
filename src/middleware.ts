import { NextRequest, NextResponse } from "next/server";
import { auth0 } from "@/lib/auth0";

export async function middleware(request: NextRequest) {
    const authRes = await auth0.middleware(request);
    authRes.headers.set("x-current-path", request.nextUrl.pathname);
    const session = await auth0.getSession();

    const isRoot = request.nextUrl.pathname === "/";
    const isAuthRoute = request.nextUrl.pathname.startsWith("/auth");

    if (request.nextUrl.pathname.startsWith("/api")) {
        return NextResponse.next();
    }

    if (session === null) {
        if (isRoot || isAuthRoute) {
            return authRes;
        }
        return NextResponse.redirect(new URL("/", request.nextUrl.origin));

    } else {
        if (isRoot) {
            return NextResponse.redirect(new URL("/post/new", request.nextUrl.origin));
        }
    }
    return authRes
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico, sitemap.xml, robots.txt (metadata files)
         */
        "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
    ],
}