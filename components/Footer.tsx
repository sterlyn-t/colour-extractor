import React from "react";
import Link from "next/link";
import SparklesText from "@/components/ui/sparkles-text";
import { IconBrandGithub, IconBrandLinkedin } from "@tabler/icons-react";
import { Abril_Fatface } from "next/font/google";

const abril = Abril_Fatface({ subsets: ["latin"], weight: "400" });

const Footer = () => {
  return (
    <footer className="w-full text-center mt-8 sm:py-8 pt-16 pb-8 border-t">
      <div className="flex items-center justify-between sm:px-16 px-2 sm:flex-row flex-col gap-y-8 sm:gap-y-0">
        <SparklesText text="Extractor" className="text-3xl" sparklesCount={3} />

        <div className="flex gap-x-2 items-center text-muted-foreground">
          <Link
            href="/privacy-policy"
            className="text-sm text-muted-foreground dark:hover:text-slate-200 hover:text-zinc-900"
          >
            Privacy Policy
          </Link>
          <Link
            href="https://github.com/sterlyn-t"
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconBrandGithub className="dark:hover:text-slate-200 hover:text-zinc-800" />
          </Link>

          <Link
            href="https://www.linkedin.com/in/sterlyn-tang/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconBrandLinkedin className="dark:hover:text-slate-200 hover:text-zinc-800" />
          </Link>
        </div>
      </div>
      <p className={"dark:text-gray-300 mt-8 " + abril.className}>
        Created by Sterlyn.
      </p>
      <p className="text-xs tracking-tight text-muted-foreground mt-2">
        © {new Date().getFullYear()} Extractor. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
