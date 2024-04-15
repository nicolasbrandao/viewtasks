"use client";

import React from "react";
import Hero from "@/components/Hero";
import LoginForm from "@/components/LoginForm";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CookieValueTypes, getCookie } from "cookies-next";

export default function LoginPage() {
  const router = useRouter();

  const token: CookieValueTypes = getCookie("access_token");

  if (token) {
    router.push("/my-lists");
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Hero />
      <LoginForm />
      <Link
        className="mx-auto w-full max-w-[400px] place-self-start px-4 text-muted-foreground underline"
        href={"/register"}
      >
        New to-doing? Register here
      </Link>
    </div>
  );
}
