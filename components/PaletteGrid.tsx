"use client";

import { useEffect, useState } from "react";
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

interface Palette {
  id: string;
  source: string;
  createdAt: string;
  colors: string[];
}

export default function PaletteGrid() {
  const [palettes, setPalettes] = useState<Palette[]>([]);

  useEffect(() => {
    const savedPalettes = JSON.parse(
      localStorage.getItem("savedPalettes") || "[]"
    );
    setPalettes(savedPalettes);
  }, []);

  const handleCopyPalette = (colors: string[]) => {
    navigator.clipboard.writeText(colors.join(", "));
    toast.success("Copied to clipboard");
  };

  const handleDeletePalette = (id: string) => {
    const updatedPalettes = palettes.filter((palette) => palette.id !== id);
    setPalettes(updatedPalettes);
    localStorage.setItem("savedPalettes", JSON.stringify(updatedPalettes));
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
                <CardTitle>{palette.source}</CardTitle>
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
