"use client";
import DisplayImage from "@/components/DisplayImage";
import { ImageUp } from "lucide-react";
import { Abril_Fatface } from "next/font/google";
import ColorThief from "colorthief";
import { useState } from "react";

const abril = Abril_Fatface({ subsets: ["latin"], weight: "400" });

export default function Home() {
  const [uploadedImage, setUploadedImage] = useState<any>(null);
  const [colorPalette, setColorPalette] = useState<any>(null);

  const uploadImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const file = event.target.files[0];
    const reader = new FileReader();

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
  return (
    <div className="flex flex-col">
      <header className="px-8 py-4 w-full min-h-[10vh] bg-gray-700 justify-between flex sticky top-0 border-b-2 border-zinc-900 items-center z-20">
        <h1
          className={"text-4xl font-medium text-purple-100 " + abril.className}
        >
          Extractor
        </h1>
        <div className="hidden sm:block justify-center align-center py-2 px-4 rounded-full hover:cursor-pointer border border-purple-800 bg-purple-300 hover:bg-purple-400 hover:border-purple-900 gap-1">
          <label
            className="font-semibold font-mono hover:cursor-pointer flex gap-1 text-zinc-800 hover:text-zinc-900"
            htmlFor="file"
          >
            <ImageUp />
            Upload Image
          </label>
          <input type="file" id="file" hidden onChange={uploadImage} />
        </div>
      </header>
      <main className="flex flex-grow flex-col items-center justify-center px-24 py-12 bg-gradient-to-t from-gray-900 via-gray-800 to-gray-700 overflow-x-hidden">
        <DisplayImage
          uploadedImage={uploadedImage}
          uploadImage={uploadImage}
          colorPalette={colorPalette}
        />
        <p className={"text-gray-400 mt-8 " + abril.className}>
          Created by Sterlyn.
        </p>
      </main>
    </div>
  );
}
