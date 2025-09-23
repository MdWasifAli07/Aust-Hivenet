"use client";
import React from "react";
import { cn } from "@/lib/utils";

// ImageKit helper
// Use runtime-safe access to environment variables to avoid TypeScript errors
// when 'import.meta' isn't allowed by the module target.
const rawIkBase =
  (typeof globalThis !== "undefined" && (globalThis as any).VITE_IK_BASE) ||
  (typeof process !== "undefined" && (process.env as any)?.VITE_IK_BASE);
const IK_BASE = rawIkBase
  ? String(rawIkBase).replace(/\/$/, "")
  : "https://ik.imagekit.io/YOUR_IMAGEKIT_ID";
function ik(path: string, tr?: string) {
  if (!path) return "";
  if (/^https?:\/\//i.test(path)) return path;
  const t = tr ? `/tr:${tr}` : "";
  return `${IK_BASE}${t}/${path.replace(/^\/+/, "")}`;
}

// Replace these with the exact file paths you already uploaded to ImageKit
const BG = ik("demo/author-card-bg.jpg", "w-1651,q-80");
const AVATAR = ik("avatars/manu.png", "w-80,h-80,fo-face,q-80");

export default function CardDemo() {
  return (
    <div className="max-w-xs w-full group/card">
      <div
        className={cn(
          "cursor-pointer relative h-96 max-w-sm mx-auto overflow-hidden rounded-md shadow-xl backgroundImage flex flex-col justify-between p-4"
        )}
        style={{
          backgroundImage: `url(${BG})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* dark overlay on hover */}
        <div className="absolute inset-0 transition duration-300 group-hover/card:bg-black opacity-60" />

        {/* author row */}
        <div className="z-10 flex flex-row items-center space-x-4">
          <img
            height={100}
            width={100}
            alt="Avatar"
            src={AVATAR}
            className="h-10 w-10 rounded-full border-2 object-cover"
            loading="lazy"
          />
          <div className="flex flex-col">
            <p className="relative z-10 text-base font-normal text-gray-50">
              Manu Arora
            </p>
            <p className="text-sm text-gray-400">2 min read</p>
          </div>
        </div>

        {/* content */}
        <div className="content text">
          <h1 className="relative z-10 text-xl font-bold text-gray-50 md:text-2xl">
            Author Card
          </h1>
          <p className="relative z-10 my-4 text-sm font-normal text-gray-50">
            Card with Author avatar, complete name and time to read — most
            suitable for blogs.
          </p>
        </div>
      </div>
    </div>
  );
}
