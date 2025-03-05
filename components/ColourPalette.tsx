"use client";
import React from "react";
import { v4 as uuidv4 } from "uuid";
import { Carousel, Card } from "@/components/Carousel";
import {
  IconDeviceFloppy,
  IconPhotoUp,
  IconWorldWww,
  IconX,
} from "@tabler/icons-react";
import { Button } from "./ui/button";
import { normalizeUrl } from "@/lib/normalizeUrl";
import toast from "react-hot-toast";

interface ColourPaletteProps {
  palette: any;
  url?: string | null;
  image?: string | null;
  imageName?: string;
  onClear: () => void;
}

export function ColourPalette({
  palette,
  url,
  image,
  imageName,
  onClear,
}: ColourPaletteProps) {
  const toHex = (rgb: string) => {
    let hex = Number(rgb).toString(16);
    if (hex.length < 2) {
      hex = "0" + hex;
    }

    return hex;
  };

  let rgb;
  let hex;

  palette.map((color: any, index: number) => {
    rgb = `rgb(${color.join(",")})`;
    hex = `#${toHex(color[0])}${toHex(color[1])}${toHex(color[2])}`;
  });

  const savePalette = () => {
    const paletteId = uuidv4();
    const hexPalette = palette.map(
      (color: any) => `#${toHex(color[0])}${toHex(color[1])}${toHex(color[2])}`
    );
    const savedPalettes = JSON.parse(
      localStorage.getItem("savedPalettes") || "[]"
    );

    const newPalette = {
      id: paletteId,
      colors: hexPalette,
      createdAt: new Intl.DateTimeFormat("en-CA").format(new Date()),
      source: imageName || url || "Unknown",
    };

    localStorage.setItem(
      "savedPalettes",
      JSON.stringify([...savedPalettes, newPalette])
    );
    toast.success("Palette saved!");
  };

  const cards = palette.map((color: any, index: number) => (
    <Card
      key={index}
      index={index}
      background={`rgb(${color.join(",")})`}
      hex={`#${toHex(color[0])}${toHex(color[1])}${toHex(color[2])}`}
    />
  ));

  return (
    <div className="w-full sm:max-w-6xl py-4 border sm:px-4 rounded-xl shadow-lg mt-16">
      <div className="flex w-full justify-between gap-2 border-b pb-4 items-center flex-col sm:flex-row">
        <div className="text-muted-foreground flex gap-x-1 dark:bg-zinc-700 sm:px-4 rounded-md">
          <p className="text-muted-foreground">Extracted from : </p>
          {image && (
            <>
              <IconPhotoUp />
              <p>{imageName}</p>
            </>
          )}
          {url && (
            <>
              <IconWorldWww />
              <a
                href={
                  normalizeUrl(url) !== null ? normalizeUrl(url) : undefined
                }
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                {url}
              </a>
            </>
          )}
        </div>
        <div className="flex gap-2 mt-4 sm:mt-0">
          <Button variant="secondary" onClick={onClear}>
            Clear
            <IconX />
          </Button>
          <Button onClick={savePalette}>
            Save
            <IconDeviceFloppy />
          </Button>
        </div>
      </div>

      <Carousel items={cards} />
    </div>
  );
}
