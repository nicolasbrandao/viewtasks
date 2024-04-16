import { NextResponse, NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  if (req.url.includes("/auth") || req.url.includes("/users"))
    return NextResponse.next();

  const accessToken = req.cookies.get("access_token");
  if (!accessToken)
    return NextResponse.redirect(`${new URL(req.url).origin}login`);

  const headers = new Headers(req.headers);
  headers.set("Authorization", `Bearer ${accessToken.value}`);

  const res = NextResponse.next({
    request: { headers },
  });

  return res;
}

export const config = {
  matcher: "/api/:path*",
};
