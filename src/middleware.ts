import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { auth0 } from "./lib/auth0";
import { NextRequest, NextResponse } from "next/server";

const { locales } = routing
type Locale = typeof locales[number];
const { defaultLocale } = routing;

function detectLocale(request: NextRequest): Locale {
    const [, localefromPath,] = request.nextUrl.pathname.split('/');
    if (locales.includes(localefromPath as Locale)) {
        return localefromPath as Locale;
    }
    return defaultLocale;
}

export async function middleware(request: NextRequest) {
    const auth0Response = await auth0.middleware(request);
    const session = await auth0.getSession();

    const isRoot = request.nextUrl.pathname === "/"
        || request.nextUrl.pathname === `/${detectLocale(request)}`;
    const isSharedPost = request.nextUrl.pathname.startsWith("/shared-post")
        || request.nextUrl.pathname.startsWith(`/${detectLocale(request)}/shared-post`);
    const isNewPostPage = request.nextUrl.pathname.startsWith("/post/new")
        || request.nextUrl.pathname.startsWith(`/${detectLocale(request)}/post/new`)
    const isSuccessPage = request.nextUrl.pathname.startsWith("/success")
        || request.nextUrl.pathname.startsWith(`/${detectLocale(request)}/success`)
    const isCancelPage = request.nextUrl.pathname.startsWith("/cancel")
        || request.nextUrl.pathname.startsWith(`/${detectLocale(request)}/cancel`);

    if (isSuccessPage || isCancelPage) {
        const sessionID = request.nextUrl.searchParams.get("session_id");
        if (!sessionID) {
            return NextResponse.redirect(new URL(`/${detectLocale(request)}/post/new`, request.nextUrl.origin));
        }

        const res = await fetch(`${request.nextUrl.origin}/api/checkPayment?session_id=${sessionID}`);

        if (res.status !== 200) {
            return NextResponse.redirect(new URL(`/${detectLocale(request)}/post/new`, request.nextUrl.origin));
        }
    }

    if (auth0Response && request.nextUrl.pathname.startsWith("/auth")) {
        return auth0Response;
    }

    if (isSharedPost) {
        return createMiddleware(routing)(request);
    }

    if (session === null) {
        if (!isRoot) {
            return NextResponse.redirect(new URL(`/${detectLocale(request)}`, request.nextUrl.origin));
        }
    }
    else {
        const res = await fetch(`${request.nextUrl.origin}/api/getTokens`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ session }),
        });
        const tokens = await res.json() as number | undefined;

        if (isRoot) {
            if (!tokens) {
                return NextResponse.redirect(new URL(`/${detectLocale(request)}/token-topup`, request.nextUrl.origin));
            }
            else {
                return NextResponse.redirect(new URL(`/${detectLocale(request)}/post/new`, request.nextUrl.origin));
            }
        }

        if (isNewPostPage && !tokens) {
            return NextResponse.redirect(new URL(`/${detectLocale(request)}/token-topup`, request.nextUrl.origin));
        }
    }

    return createMiddleware(routing)(request);
}

export const config = {
    matcher: [
        "/",

        "/(en|ru)/:path*",

        "/((?!_next/image|_next/static|images|api|favicon.ico|_vercel|.*\\..*).*)",
    ],
};
