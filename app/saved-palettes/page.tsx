import Link from "next/link";
import { PlusCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import PaletteGrid from "@/components/PaletteGrid";

export default function SavedPalettesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Your Saved Palettes
            </h1>
            <p className="text-muted-foreground mt-1">
              View and manage your color palette collection
            </p>
          </div>
          <Button asChild className="gap-2">
            <Link href="/">
              <PlusCircle className="h-4 w-4" />
              Create New Palette
            </Link>
          </Button>
        </div>
      </header>
      <main>
        <PaletteGrid />
      </main>
    </div>
  );
}
