"use client";
import DisplayImage from "@/components/DisplayImage";
import { Abril_Fatface } from "next/font/google";
import ColorThief from "colorthief";
import { useEffect, useState } from "react";
import Link from "next/link";
import { PlaceholdersAndVanishInput } from "@/components/PlaceholdersAndVanishInput";
import SparklesText from "@/components/ui/sparkles-text";
import { ModeToggle } from "@/components/ThemeToggle";
import { Highlight } from "@/components/HeroHighlight";
import { FileRejection } from "react-dropzone";
import { ColourPalette } from "@/components/ColourPalette";
import { normalizeUrl } from "@/lib/normalizeUrl";

const abril = Abril_Fatface({ subsets: ["latin"], weight: "400" });

const placeholders = ["Enter any website URL"];

export default function Home() {
  const [uploadedImage, setUploadedImage] = useState<any>(null);
  const [imageName, setImageName] = useState<string>("");
  const [colorPalette, setColorPalette] = useState<any>(null);
  const [url, setUrl] = useState<string>("");
  const [colors, setColors] = useState<number[][] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>();
  const [placeholders, setPlaceholders] = useState<string[]>([
    "Enter any website URL",
  ]);

  useEffect(() => {
    if (loading) {
      setPlaceholders(["Loading..."]);
    }
    if (!loading) {
      setPlaceholders(["Enter any website URL"]);
    }
  }, [loading]);

  const handleExtractColors = async () => {
    if (!url) return;

    setLoading(true);
    setError(null);

    const normalizedUrl = normalizeUrl(url);
    if (!normalizedUrl) return;

    try {
      const response = await fetch(
        `/api/screenshot?url=${encodeURIComponent(normalizedUrl)}`
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch colors: ${response.statusText}`);
      }

      const data = await response.json();
      if (data.colors) {
        setColors(data.colors);
      } else {
        throw new Error("No colors found in the response");
      }
    } catch (error) {
      setError((error as Error).message);
      console.error("Error extracting colors:", error);
    } finally {
      setLoading(false);
    }
  };

  const uploadImage = (
    acceptedFiles: File[],
    rejectedFiles: FileRejection[]
  ) => {
    // Filter and notify if there are unsupported files
    const unsupportedFiles = rejectedFiles
      .map((file) => file.file.name)
      .join(", ");

    if (unsupportedFiles) {
      setError(`Unsupported file type(s): ${unsupportedFiles}`);
    } else {
      setError(null); // Clear error if all files are supported
    }
    if (!acceptedFiles) return;
    const file = acceptedFiles[0];
    const reader = new FileReader();

    setImageName(file.name);

    reader.onload = async (event) => {
      if (!event.target) return;
      const img = new Image();
      img.onload = () => {
        if (!event.target) return;
        const colorThief = new ColorThief();
        const palette = colorThief.getPalette(img, 6);
        setUploadedImage(event.target.result);
        setColorPalette(palette);
      };
      img.src = String(event.target.result);
    };

    reader.readAsDataURL(file);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleExtractColors();
  };
  return (
    <div className="flex flex-col">
      <header className="px-12 sm:px-8 py-4 w-full dark:border-b h-22 justify-between bg-transparent shadow-md flex sticky top-0 backdrop-blur-md items-center z-50">
        <Link href="/">
          <h1 className={"text-4xl font-medium " + abril.className}>
            Extractor
          </h1>
        </Link>
        <ModeToggle />
      </header>
      <main className="flex flex-grow flex-col items-center justify-center px-8 sm:px-24 pb-12  overflow-x-hidden w-full">
        <div className="h-full w-full dark:bg-background bg-white  dark:bg-grid-white/[0.1] bg-grid-black/[0.1] relative flex items-center justify-center">
          {/* Radial gradient for the container to give a faded look */}
          <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-background bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
          <div className="flex flex-col p-2 text-center items-center w-full mt-8">
            {(!url || !uploadedImage) && (
              <>
                <span className="text-sm text-primary font-medium tracking-tight bg-card px-2 py-1 rounded-full w-60 mb-2">
                  ✨ Start Generating Palettes Today
                </span>
                <SparklesText text="Extractor" />
                <p className="text-lg sm:text-xl font-medium relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-300 to-neutral-700 py-8">
                  Extract a colour palette from any{" "}
                  <Highlight className="text-white">website</Highlight> or{" "}
                  <Highlight className="text-white">image</Highlight> !
                </p>

                <PlaceholdersAndVanishInput
                  placeholders={placeholders}
                  loading={loading}
                  onChange={handleChange}
                  onSubmit={onSubmit}
                />
              </>
            )}

            {!colors && (
              <div className="mt-8 z-40 w-full p-2 sm:p-0  overflow-y-hidden">
                <DisplayImage
                  uploadedImage={uploadedImage}
                  url={url}
                  imageName={imageName}
                  uploadImage={uploadImage}
                  setUploadedImage={() => setUploadedImage(null)}
                  colorPalette={colorPalette}
                />
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-wrap mt-2">
          {colors && (
            <ColourPalette
              palette={colors}
              url={url}
              onClear={() => {
                setUrl("");
                setColors(null);
              }}
            />
          )}
        </div>
      </main>
    </div>
  );
}
