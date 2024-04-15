import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(req: NextRequest) {
  // ignore cookie for auth urls
  if (req.url.includes("/auth")) return NextResponse.next();

  const accessToken = req.cookies.get("access_token");
  if (!accessToken) return NextResponse.redirect("/login");

  const headers = new Headers(req.headers);
  headers.set("Authorization", `Bearer ${accessToken.value}`);

  const res = NextResponse.next({
    request: { headers },
  });

  return res;
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/api/:path*",
};
