"use client";
import React from "react";
import { Carousel, Card } from "@/components/Carousel";

interface ColourPaletteProps {
  palette: any;
}

export function ColourPalette({ palette }: ColourPaletteProps) {
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
    <div className="max-w-6xl py-8">
      {/* <h2 className="max-w-7xl pl-4 mx-auto text-xl md:text-4xl font-bold text-neutral-200 font-sans">
        Palette
      </h2> */}
      <Carousel items={cards} />
    </div>
  );
}
