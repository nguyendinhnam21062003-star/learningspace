"use client";

import * as React from "react";
import { Check } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Command,
  CommandInput,
  CommandList,
  CommandGroup,
  CommandItem,
  CommandEmpty,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";

export type FieldPill = {
  type: "field";
  key: string;
  label: string;
};

export type FieldItem = {
  id: string;
  label: string;
  count?: number;
};

type FieldFilterProps = {
  fields: FieldItem[];
  value?: string[];
  defaultValue?: string[];
  onChange?: (
    selected: string[],
    meta: { pills: FieldPill[]; added?: string; removed?: string }
  ) => void;
  onShowMore?: () => void;
  className?: string;
};

export function FieldFilter({
  fields,
  value,
  defaultValue,
  onChange,
  onShowMore,
  className,
}: FieldFilterProps) {
  const isControlled = value !== undefined;
  const [internalSelected, setInternalSelected] = React.useState<string[]>(
    defaultValue ?? []
  );
  const selected = isControlled ? (value as string[]) : internalSelected;

  const emit = React.useCallback(
    (nextSelected: string[], diff?: { added?: string; removed?: string }) => {
      const pills: FieldPill[] = nextSelected
        .map((id) => fields.find((f) => f.id === id))
        .filter(Boolean)
        .map((f) => ({ type: "field", key: f!.id, label: f!.label }));
      onChange?.(nextSelected, { pills, ...diff });
    },
    [onChange, fields]
  );

  const toggle = (id: string) => {
    let next: string[];
    let diff: { added?: string; removed?: string } = {};
    if (selected.includes(id)) {
      next = selected.filter((x) => x !== id);
      diff.removed = id;
    } else {
      next = [...selected, id];
      diff.added = id;
    }
    if (!isControlled) setInternalSelected(next);
    emit(next, diff);
  };

  return (
    <section
      aria-labelledby="field-filter-heading"
      className={cn(
        "rounded-xl border border-[color:var(--border)] bg-[color:var(--card)] text-[color:var(--foreground)]",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-3 pt-3">
        <h3 id="field-filter-heading" className="text-sm font-semibold">
          Lĩnh vực
        </h3>
        {selected.length > 0 && (
          <span className="text-xs text-[color:var(--muted-foreground)]">
            Đã chọn {selected.length}
          </span>
        )}
      </div>

      {/* Command list */}
      <Command className="bg-transparent">
        <CommandInput placeholder="Tìm lĩnh vực..." />
        <CommandList>
          {fields.length === 0 && (
            <CommandEmpty className="text-sm text-muted-foreground text-center">
              Không tìm thấy lĩnh vực.
            </CommandEmpty>
          )}
          <CommandGroup>
            {fields.map((field) => {
              const checked = selected.includes(field.id);
              return (
                <CommandItem
                  key={field.id}
                  onSelect={() => toggle(field.id)}
                  className={cn(
                    "flex items-center justify-between rounded-md px-3 py-2 cursor-pointer select-none",
                    "hover:bg-[color:var(--primary)]/5 dark:hover:bg-[color:var(--primary)]/10",
                    "[&[aria-selected='true']]:bg-[color:var(--primary)]/5 dark:[&[aria-selected='true']]:bg-[color:var(--primary)]/10 [&[aria-selected='true']]:text-[color:var(--foreground)]"
                  )}
                >
                  <div className="flex items-center gap-2">
                    <Checkbox
                      checked={checked}
                      onCheckedChange={() => toggle(field.id)}
                      className="h-4 w-4 rounded border border-[color:var(--border)] data-[state=checked]:bg-[color:var(--primary)] data-[state=checked]:border-[color:var(--primary)]"
                    />
                    <span className="text-sm text-[color:var(--foreground)]">
                      {field.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {typeof field.count === "number" && (
                      <span className="text-xs text-[color:var(--muted-foreground)] tabular-nums">
                        {field.count}
                      </span>
                    )}
                  </div>
                </CommandItem>
              );
            })}
          </CommandGroup>
        </CommandList>
      </Command>

      {/* Footer */}
      {onShowMore && (
        <div className="border-t border-[color:var(--border)] px-3 py-2">
          <button
            type="button"
            onClick={onShowMore}
            className="w-full text-sm text-[color:var(--foreground)] hover:bg-[color:var(--primary)]/5 dark:hover:bg-[color:var(--primary)]/10 rounded-md py-1.5 transition-colors"
          >
            Hiển thị thêm
          </button>
        </div>
      )}
    </section>
  );
}
