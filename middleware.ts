import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const session = request.cookies.get("aiapp")?.value;
    const { pathname } = request.nextUrl;

    if (pathname == "/aiapp") {
        if (!session) {
            return NextResponse.next();
        } else {
            return NextResponse.redirect(new URL("/search"));
        }
    }

    // If there is no session and the user is not on the login route, redirect to login
    if (!session && pathname !== "/login") {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    // Allow the request to continue if the user is logged in or on the login page
    return NextResponse.next();
}


// Optionally, don't invoke Middleware on some paths
export const config = {
    matcher: ["/((?!api|images|_next/static|_next/images|png|jpg|svg|jpeg|webp|avif|gif|favicon.ico).*)"],
};