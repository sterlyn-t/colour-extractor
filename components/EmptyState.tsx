import Link from "next/link";
import { PlusCircle, Palette } from "lucide-react";

import { Button } from "@/components/ui/button";

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="rounded-full bg-muted p-6 mb-6">
        <Palette className="h-12 w-12 text-muted-foreground" />
      </div>
      <h2 className="text-2xl font-semibold mb-2">No saved palettes yet</h2>
      <p className="text-muted-foreground max-w-md mb-6">
        You haven&apos;t saved any color palettes. Create your first palette to
        get started with your collection.
      </p>
      <Button asChild className="gap-2">
        <Link href="/">
          <PlusCircle className="h-4 w-4" />
          Create Your First Palette
        </Link>
      </Button>
    </div>
  );
}
