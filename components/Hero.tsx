import Persona from "@/public/persona.svg";
import React from "react";
import Image from "next/image";

export default function Hero() {
  return (
    <>
      <Image
        alt="Person reading a book"
        className="h-[250px] w-[250px] rounded-full bg-[#000]"
        height={250}
        src={Persona}
        width={250}
      />
      <div className="mx-auto flex w-full max-w-[400px] flex-col items-center justify-center px-4 text-center font-bold">
        <h1 className="text-[3rem]">Just To-Do It</h1>
        <h2 className="text-[2rem]">Your #1 platform to just do it!</h2>
      </div>
    </>
  );
}
