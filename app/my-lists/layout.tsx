import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  if (!cookies().get("access_token"))
    return redirect("/login?error=unauthorized");

  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
