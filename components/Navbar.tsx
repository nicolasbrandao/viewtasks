import React from "react";
import UserDropdownMenu from "./UserDropdownMenu";

export default function Navbar() {
  return (
    <nav className="absolute left-0 top-0 z-20 flex h-fit w-full flex-row-reverse items-center justify-between p-2">
      <UserDropdownMenu />
    </nav>
  );
}
