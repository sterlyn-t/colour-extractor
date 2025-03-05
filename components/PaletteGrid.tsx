"use client";

import { useState } from "react";
import { Copy, ExternalLink, MoreHorizontal, Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import toast from "react-hot-toast";
import { EmptyState } from "./EmptyState";

// Mock data for saved palettes
const initialPalettes = [
  {
    id: "1",
    name: "Sunset Vibes",
    description: "Warm colors inspired by sunset",
    colors: ["#FF7B89", "#FFB26B", "#FFD5C2", "#F6EAC2", "#ECD5E3"],
    createdAt: "2023-10-15",
  },
  {
    id: "2",
    name: "Ocean Breeze",
    description: "Cool tones from the sea",
    colors: ["#05445E", "#189AB4", "#75E6DA", "#D4F1F9", "#FFFFFF"],
    createdAt: "2023-10-10",
  },
  {
    id: "3",
    name: "Forest Retreat",
    description: "Natural greens and browns",
    colors: ["#2C5F2D", "#97BC62", "#D0E562", "#FFE77A", "#AA8976"],
    createdAt: "2023-10-05",
  },
  {
    id: "4",
    name: "Berry Smoothie",
    description: "Sweet berry colors",
    colors: ["#6E2594", "#A12568", "#CD3B4A", "#E86B32", "#F6C90E"],
    createdAt: "2023-09-28",
  },
];

export default function PaletteGrid() {
  const [palettes, setPalettes] = useState(initialPalettes);

  const handleCopyPalette = (colors: string[]) => {
    navigator.clipboard.writeText(colors.join(", "));
    toast.success("Copied to clipboard");
  };

  const handleDeletePalette = (id: string) => {
    setPalettes(palettes.filter((palette) => palette.id !== id));
    toast.success("Palette deleted");
  };

  if (palettes.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {palettes.map((palette) => (
        <Card key={palette.id} className="overflow-hidden">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>{palette.name}</CardTitle>
                <CardDescription>{palette.description}</CardDescription>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={() => handleCopyPalette(palette.colors)}
                  >
                    <Copy className="mr-2 h-4 w-4" />
                    Copy colors
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <a href={`/palette/${palette.id}`}>
                      <ExternalLink className="mr-2 h-4 w-4" />
                      View details
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-destructive focus:text-destructive"
                    onClick={() => handleDeletePalette(palette.id)}
                  >
                    <Trash className="mr-2 h-4 w-4" />
                    Delete palette
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
          <CardContent className="pb-3">
            <div className="flex h-20 rounded-md overflow-hidden">
              {palette.colors.map((color, index) => (
                <div
                  key={index}
                  className="flex-1 transition-all hover:flex-[1.5] relative group"
                  style={{ backgroundColor: color }}
                >
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
                    <span className="text-white text-xs font-mono bg-black/50 px-2 py-1 rounded">
                      {color}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="text-xs text-muted-foreground">
            Created on {new Date(palette.createdAt).toLocaleDateString()}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
