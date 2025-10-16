"use client";

import * as React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Palette } from "lucide-react";

const themes = [
  { name: "Neutral", value: "neutral" },
  { name: "Blue", value: "blue" },
  { name: "Purple", value: "purple" },
  { name: "Emerald", value: "emerald" },
  { name: "Rose", value: "rose" },
];

export function ThemeSwitcher() {
  const [color, setColor] = React.useState<string>("neutral");

  React.useEffect(() => {
    const saved = localStorage.getItem("theme-color");
    if (saved) {
      setColor(saved);
      document.documentElement.setAttribute("data-color", saved);
    }
  }, []);

  function handleChange(value: string) {
    setColor(value);
    localStorage.setItem("theme-color", value);
    document.documentElement.setAttribute("data-color", value);
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Chọn theme màu">
          <Palette className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {themes.map((t) => (
          <DropdownMenuItem
            key={t.value}
            onClick={() => handleChange(t.value)}
            className={color === t.value ? "font-semibold text-primary" : ""}
          >
            {t.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
