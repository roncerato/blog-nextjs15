import { NextResponse, type NextRequest } from "next/server"
import createMiddleware from "next-intl/middleware"
import { auth0 } from "./lib/auth0"
import { routing } from "@/i18n/routing"

const intlMiddleware = createMiddleware(routing)

type RoutingConfig = {
    locales: readonly string[];
    defaultLocale: string;
};

export function getLocaleFromPath(pathname: string, routing: RoutingConfig): string {
    const { locales, defaultLocale } = routing;
    const nonDefaultLocales = locales.filter(locale => locale !== defaultLocale);

    if (nonDefaultLocales.length === 0) return defaultLocale;

    const pattern = new RegExp(`^\\/(${nonDefaultLocales.join('|')})(?=\\/|$)`);
    const match = pathname.match(pattern);

    return match ? match[1] : defaultLocale;
}

export async function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname
    const intlRes = intlMiddleware(request)
    const authResponse = await auth0.middleware(request)
    const session = await auth0.getSession();
    const locale = getLocaleFromPath(pathname, routing);
    const localePrefix = locale === routing.defaultLocale ? '/' : `/${locale}/`;
    const isRoot = request.nextUrl.pathname === `/` || request.nextUrl.pathname === `/${locale}`;
    const isSharedPost = request.nextUrl.pathname.startsWith(`${localePrefix}shared-post`)
    const isNewPostPage = request.nextUrl.pathname.startsWith(`${localePrefix}post/new`)
    const isSuccessOrCancel = request.nextUrl.pathname.startsWith(`${localePrefix}success`) || request.nextUrl.pathname.startsWith(`${localePrefix}cancel`);
    if (request.nextUrl.pathname.startsWith("/auth")) {
        return authResponse
    }

    if (isSuccessOrCancel) {
        const sessionID = request.nextUrl.searchParams.get("session_id");
        if (!sessionID) {
            return NextResponse.redirect(new URL("/post/new", request.nextUrl.origin));
        }

        const res = await fetch(`${request.nextUrl.origin}/api/checkPayment?session_id=${sessionID}`);

        if (res.status !== 200) {
            return NextResponse.redirect(new URL("/post/new", request.nextUrl.origin));
        }
    }

    if (isSharedPost) {
        return intlRes
    }

    if (!session) {
        if (!isRoot) {
            return NextResponse.redirect(new URL(`/`, request.nextUrl.origin))
        }
    } else {

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
                return NextResponse.redirect(new URL("/token-topup", request.nextUrl.origin));
            }
            else {
                return NextResponse.redirect(new URL("/post/new", request.nextUrl.origin));
            }
        }

        if (isNewPostPage && !tokens) {
            return NextResponse.redirect(new URL("/token-topup", request.nextUrl.origin));
        }
    }

    for (const [key, value] of authResponse.headers) {
        if (key.toLowerCase() === 'set-cookie') continue;
        intlRes.headers.set(key, value);
    }

    return intlRes
}

export const config = {
    matcher: [
        "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|api).*)",
    ],
}