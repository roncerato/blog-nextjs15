import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { auth0 } from "./lib/auth0";
import { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
    const auth0Response = await auth0.middleware(request);
    if (auth0Response && request.nextUrl.pathname !== "/") {
        return auth0Response;
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
