"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";

export const SavedPalettesButton = () => {
  const [hasSavedPalettes, setHasSavedPalettes] = useState(false);

  useEffect(() => {
    const savedPalettes = JSON.parse(
      localStorage.getItem("savedPalettes") || "[]"
    );
    setHasSavedPalettes(savedPalettes.length > 0);
  }, []);

  if (!hasSavedPalettes) return null;

  return (
    <Link href="/saved-palettes">
      <Button>Saved Palettes</Button>
    </Link>
  );
};
