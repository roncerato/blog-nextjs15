import { NextRequest, NextResponse } from "next/server";
import { auth0 } from "@/lib/auth0";
import { WithId } from "mongodb";
import { IDBUser } from "./types/db";

export async function middleware(request: NextRequest) {
    const authRes = await auth0.middleware(request);
    authRes.headers.set("x-current-path", request.nextUrl.pathname);
    const session = await auth0.getSession();

    const isRoot = request.nextUrl.pathname === "/";
    const isAuthRoute = request.nextUrl.pathname.startsWith("/auth");

    const sessionID = request.nextUrl.searchParams.get("session_id");
    const isSuccessOrCancel = request.nextUrl.pathname.startsWith("/success") || request.nextUrl.pathname.startsWith("/cancel");

    // Посмотреть что с этим кодом не так и почему он не работает корректно
    const isNewPost = request.nextUrl.pathname.startsWith("/post/new");

    const userData = await fetch(`${request.nextUrl.origin}/api/getUserData`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },

    });
    const userProfile = await userData.json() as WithId<IDBUser> | null;

    if (isNewPost && userProfile?.availableTokens === 0) {
        return NextResponse.redirect(new URL("/token-topup", request.nextUrl.origin));
    }
    // ---------------------------------------------
    if (isSuccessOrCancel) {
        if (!sessionID) {
            return NextResponse.redirect(new URL("/post/new", request.nextUrl.origin));
        }

        const res = await fetch(`${request.nextUrl.origin}/api/checkPayment?session_id=${sessionID}`);

        if (res.status !== 200) {
            return NextResponse.redirect(new URL("/post/new", request.nextUrl.origin));
        }
    }

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