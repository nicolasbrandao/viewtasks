import React from "react";
import Persona from "@/public/persona_icon.svg";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div>
      <Image
        alt="Person reading a book"
        height={300}
        src={Persona}
        width={300}
      />
    </div>
  );
}
