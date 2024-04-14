import React from "react";
import Hero from "@/components/Hero";
import LoginForm from "@/components/LoginForm";
import Link from "next/link";

export default function LoginPage() {
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
