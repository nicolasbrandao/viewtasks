import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // check auth
  if (!cookies().get("access_token"))
    return redirect("/login?error=unauthorized");

  return children;
}