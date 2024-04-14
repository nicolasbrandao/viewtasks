import { ListChecks } from "lucide-react";
import React from "react";

export default function Hero() {
  return (
    <>
      <ListChecks className="h-[180px] w-[180px]" />
      <div className="mx-auto flex w-full max-w-[400px] flex-col items-center justify-center px-4 text-center font-bold">
        <h1 className="text-[3rem]">Just To-Do It</h1>
        <h2 className="text-[2rem]">Your #1 platform to just do it!</h2>
      </div>
    </>
  );
}
