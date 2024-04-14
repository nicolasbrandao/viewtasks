import React from "react";
import RegisterForm from "@/components/RegisterForm";
import Link from "next/link";
import Hero from "@/components/Hero";

export default function RegisterPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <Hero />
      <RegisterForm />
      <Link
        className="mx-auto w-full max-w-[400px] place-self-start px-4 text-muted-foreground underline"
        href={"/login"}
      >
        Already registered? Login here
      </Link>
    </main>
  );
}
