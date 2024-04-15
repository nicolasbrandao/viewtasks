import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-xl font-bold">Not Found</h1>
      <p>Could not find requested page</p>
      <Link className="w-fit px-4 text-muted-foreground underline" href={"/"}>
        Return Home
      </Link>
    </main>
  );
}
