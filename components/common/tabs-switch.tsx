"use client";

import * as React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { ChevronsUpDown, PanelsTopLeft } from "lucide-react";

type TabItem = { value: string; label: string };

type TabsSwitchProps = {
  tabs?: TabItem[];
  value?: string;
  defaultValue?: string;
  onChange?: (next: string) => void;
  className?: string;
};

const DEFAULT_TABS: TabItem[] = [
  { value: "all", label: "Tất cả" },
  { value: "featured", label: "Nổi bật" },
  { value: "saved", label: "Đã lưu" },
];

export function TabsSwitch({
  tabs = DEFAULT_TABS,
  value,
  defaultValue = tabs[0]?.value ?? "all",
  onChange,
  className,
}: TabsSwitchProps) {
  const isControlled = typeof value === "string";
  const [internal, setInternal] = React.useState(defaultValue);
  const current = isControlled ? (value as string) : internal;

  const setValue = (v: string) => {
    if (!isControlled) setInternal(v);
    onChange?.(v);
  };

  return (
    <div className={cn("w-full", className)}>
      {/* Desktop/Tablet: Tabs kiểu nút nổi, căn trái, auto width */}
      <div className="hidden sm:block">
        <Tabs value={current} onValueChange={setValue}>
          <TabsList
            className={cn(
              "h-10 md:h-11 rounded-xl p-1 flex gap-1",
              "bg-[color:var(--card)] border border-[color:var(--border)]",
              "shadow-xs transition-colors"
            )}
          >
            {tabs.map((t) => (
              <TabsTrigger
                key={t.value}
                value={t.value}
                className={cn(
                  "rounded-lg px-3 md:px-4 text-sm font-medium",
                  "transition-colors duration-150",
                  "data-[state=active]:bg-[color:var(--primary)] data-[state=active]:text-[color:var(--primary-foreground)]",
                  "data-[state=inactive]:text-[color:var(--muted-foreground)] hover:bg-[color:var(--muted)]"
                )}
              >
                {t.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {/* Mobile: chỉ 1 nút icon mở Popover + Combobox để chọn tab */}
      <div className="sm:hidden">
        <MobileTabsPicker
          tabs={tabs}
          value={current}
          onSelect={(v) => setValue(v)}
        />
      </div>
    </div>
  );
}

function MobileTabsPicker({
  tabs,
  value,
  onSelect,
}: {
  tabs: TabItem[];
  value: string;
  onSelect: (v: string) => void;
}) {
  const [open, setOpen] = React.useState(false);
  const activeLabel = tabs.find((t) => t.value === value)?.label ?? "Chọn tab";

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={cn(
            "h-10 rounded-xl gap-2 w-full sm:w-auto",
            "border border-[color:var(--border)] bg-[color:var(--card)]",
            "text-[color:var(--foreground)] hover:bg-[color:var(--muted)] transition-colors"
          )}
          aria-label="Chọn tab"
        >
          <PanelsTopLeft className="h-4 w-4 text-[color:var(--muted-foreground)]" />
          <span className="text-sm">{activeLabel}</span>
          <ChevronsUpDown className="ml-1 h-4 w-4 text-[color:var(--muted-foreground)] opacity-60" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="w-[90vw] max-w-sm p-0 bg-[color:var(--card)] border border-[color:var(--border)] shadow-md rounded-xl"
      >
        <Command>
          <CommandInput
            placeholder="Tìm tab..."
            className="h-10 text-[color:var(--foreground)] placeholder-[color:var(--muted-foreground)]"
          />
          <CommandList>
            <CommandEmpty>Không có tab phù hợp.</CommandEmpty>
            <CommandGroup>
              {tabs.map((t) => (
                <CommandItem
                  key={t.value}
                  value={t.label}
                  onSelect={() => {
                    onSelect(t.value);
                    setOpen(false);
                  }}
                  className={cn(
                    "cursor-pointer transition-colors",
                    t.value === value
                      ? "text-[color:var(--primary)] bg-[color:var(--muted)]"
                      : "text-[color:var(--foreground)] hover:bg-[color:var(--muted)]"
                  )}
                >
                  {t.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default TabsSwitch;
