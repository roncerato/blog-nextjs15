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

    const authResponse = await auth0.middleware(request)
    const session = await auth0.getSession();
    if (request.nextUrl.pathname.startsWith("/auth")) {
        return authResponse
    }

    const locale = getLocaleFromPath(pathname, routing);
    const localePrefix = locale === routing.defaultLocale ? '/' : `/${locale}/`;
    const intlRes = intlMiddleware(request)
    for (const [key, value] of authResponse.headers) {
        intlRes.headers.set(key, value)
    }

    const isRoot = request.nextUrl.pathname === `/` || request.nextUrl.pathname === `/${locale}`;
    const isSharedPost = request.nextUrl.pathname.startsWith(`${localePrefix}shared-post`)

    if (isSharedPost) {
        return intlRes
    }

    if (!session) {
        if (!isRoot) {
            return NextResponse.redirect(new URL(`/${locale}`, request.nextUrl.origin))
        }
    }

    return intlRes
}

export const config = {
    matcher: [
        "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|api).*)",
    ],
}