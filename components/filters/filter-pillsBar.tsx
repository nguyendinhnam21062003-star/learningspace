"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";

type Pill = { key: string; label: string; type: string };

type FilterPillsBarProps = {
  pills: Pill[];
  onRemove: (key: string) => void;
};

export function FilterPillsBar({ pills, onRemove }: FilterPillsBarProps) {
  if (pills.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {pills.map((pill) => (
        <Badge
          key={pill.key}
          variant="outline"
          className="flex items-center gap-1 cursor-pointer"
          onClick={() => onRemove(pill.key)}
        >
          <span>{pill.label}</span>
          <span className="text-[color:var(--destructive)] font-bold">×</span>
        </Badge>
      ))}
    </div>
  );
}
