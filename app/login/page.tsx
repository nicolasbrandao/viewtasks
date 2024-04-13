import React from "react";
import { ListChecks } from "lucide-react";
import LoginForm from "@/components/LoginForm";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <ListChecks className="h-[180px] w-[180px]" />
      <div className="mx-auto flex w-full max-w-[400px] flex-col items-center justify-center px-4 text-center font-bold">
        <h1 className="text-[3rem]">Just To-Do It</h1>
        <h2 className="text-[2rem]">Your #1 platform to just do it!</h2>
      </div>
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
