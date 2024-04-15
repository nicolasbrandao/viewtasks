import { LoaderCircle } from "lucide-react";

export default function Loading() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <LoaderCircle className="animate-spin h-[100px] w-[100px]"/>
    </main>
  );
}
