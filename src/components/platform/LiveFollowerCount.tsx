"use client";

import { useEffect, useRef, useState } from "react";
import { formatFollowers } from "@/lib/platform/format";

export function LiveFollowerCount({ value }: { value: number }) {
  const [flash, setFlash] = useState(false);
  const prev = useRef(value);

  useEffect(() => {
    if (prev.current !== value) {
      prev.current = value;
      setFlash(true);
      const t = setTimeout(() => setFlash(false), 600);
      return () => clearTimeout(t);
    }
  }, [value]);

  return (
    <span
      className={`font-display text-2xl font-bold transition-colors duration-500 sm:text-3xl ${
        flash ? "text-atheo-coral" : "text-atheo-aubergine"
      }`}
    >
      {formatFollowers(value)}
    </span>
  );
}
