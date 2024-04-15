import Hero from "@/components/Hero";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <Hero />
      <div className="mt-8">
        <Link
          className="mx-auto w-full max-w-[400px] place-self-start px-4 text-muted-foreground underline"
          href={"/register"}
        >
          New to-doing? Register here
        </Link>
        or
        <Link
          className="mx-auto w-full max-w-[400px] place-self-start px-4 text-muted-foreground underline"
          href={"/login"}
        >
          Login
        </Link>
      </div>
    </main>
  );
}
