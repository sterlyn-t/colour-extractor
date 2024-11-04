import Link from "next/link";
import React from "react";
import { ModeToggle } from "./ThemeToggle";

import { Abril_Fatface } from "next/font/google";

const abril = Abril_Fatface({ subsets: ["latin"], weight: "400" });

const Header = () => {
  return (
    <header className="px-12 sm:px-8 py-4 w-full dark:border-b h-22 justify-between bg-transparent shadow-md flex sticky top-0 backdrop-blur-md items-center z-50">
      <Link href="/">
        <h1 className={"text-4xl font-medium " + abril.className}>Extractor</h1>
      </Link>
      <ModeToggle />
    </header>
  );
};

export default Header;
