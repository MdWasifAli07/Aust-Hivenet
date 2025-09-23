"use client";
import React from "react";
import { ThreeDMarquee } from "@/Components/ui/3d-marquee"; // ✅ fixed path

export default function ThreeDMarqueeDemo() {
  const images = [/* ...same list... */];
  return (
    <div className="mx-auto my-10 max-w-7xl rounded-3xl bg-gray-950/5 p-2 ring-1 ring-neutral-700/10 dark:bg-neutral-800">
      <ThreeDMarquee images={images} />
    </div>
  );
}
