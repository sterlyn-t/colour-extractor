import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Abril_Fatface } from "next/font/google";
import { cn } from "@/lib/utils";
import Link from "next/link";
import SparklesText from "@/components/ui/sparkles-text";
import { IconBrandGithub, IconBrandLinkedin } from "@tabler/icons-react";

const inter = Inter({ subsets: ["latin"] });
const abril = Abril_Fatface({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "Extractor",
  description: "Upload any image to extract a colour palette.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(inter.className)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Toaster />
          {children}
          <footer className="w-full text-center mt-8 py-8">
            <div className="flex items-center justify-between sm:px-16 px-2 sm:flex-row flex-col gap-y-8 sm:gap-y-0">
              <SparklesText
                text="Extractor"
                className="text-3xl"
                sparklesCount={3}
              />

              <div className="flex gap-x-2 items-center text-muted-foreground">
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
                <Link
                  href="/privacy-policy"
                  className="text-sm text-muted-foreground dark:hover:text-slate-200 hover:text-zinc-800"
                >
                  Privacy Policy
                </Link>
              </div>
            </div>
            <p className={"dark:text-gray-300 mt-8 " + abril.className}>
              Created by Sterlyn.
            </p>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
