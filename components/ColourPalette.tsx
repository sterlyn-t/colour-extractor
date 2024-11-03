"use client";
import React from "react";
import { Carousel, Card } from "@/components/Carousel";
import {
  IconDatabase,
  IconImageInPicture,
  IconWorldWww,
  IconX,
} from "@tabler/icons-react";
import { Button } from "./ui/button";
import { normalizeUrl } from "@/lib/normalizeUrl";

interface ColourPaletteProps {
  palette: any;
  url?: string | null;
  image?: string | null;
  onClear: () => void;
}

export function ColourPalette({
  palette,
  url,
  image,
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

  const cards = palette.map((color: any, index: number) => (
    <Card
      key={index}
      index={index}
      background={`rgb(${color.join(",")})`}
      hex={`#${toHex(color[0])}${toHex(color[1])}${toHex(color[2])}`}
    />
  ));

  return (
    <div className="max-w-6xl py-4 border px-4 rounded-xl shadow-lg mt-16">
      <div className="flex w-full justify-between gap-2 border-b pb-4 items-center">
        <div className="text-muted-foreground flex gap-x-1 dark:bg-zinc-700 px-4 rounded-md">
          <p className="text-muted-foreground">Extracted from : </p>
          {image && (
            <>
              <IconImageInPicture />
              <p>{image.slice(0, 30)}</p>
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
        <div className="flex gap-2">
          <Button variant="secondary" onClick={onClear}>
            Clear
            <IconX />
          </Button>
          <Button>
            Save
            <IconDatabase />
          </Button>
        </div>
      </div>

      <Carousel items={cards} />
    </div>
  );
}
