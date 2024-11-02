import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Abril_Fatface } from "next/font/google";
import { cn } from "@/lib/utils";

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
          <footer className="w-full text-center my-2 py-8">
            <p className={"dark:text-slate-100 mt-8 " + abril.className}>
              Created by Sterlyn.
            </p>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
