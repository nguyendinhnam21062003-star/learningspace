"use client";

import * as React from "react";
import { Filter, Check, ChevronsUpDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
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
import { Checkbox } from "@/components/ui/checkbox";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

type FilterValue = {
  fields: string[];
  subjects: string[];
};

type FilterBarProps = {
  /** Danh sách Lĩnh vực */
  fields?: string[];
  /** Danh sách Môn học */
  subjects?: string[];
  /** Giá trị hiện tại */
  value?: FilterValue;
  /** Callback khi thay đổi */
  onChange?: (next: FilterValue) => void;
  /** Class container (để đặt cùng hàng với search bar) */
  className?: string;
  /** Placeholder cho 2 combobox */
  placeholders?: { field?: string; subject?: string };
};

const DEFAULT_FIELDS = [
  "IT",
  "Marketing",
  "PR",
  "Banking",
  "Accounting",
  "Logistics",
  "AI",
  "Design",
  "Data Science",
  "Finance",
  "HR",
  "Operations",
  "Sales",
  "Product Management",
  "QA/Testing",
  "Cybersecurity",
  "Cloud",
  "DevOps",
  "Business Analytics",
];

const DEFAULT_SUBJECTS = [
  "Kinh tế vi mô",
  "Kinh tế vĩ mô",
  "Xác suất thống kê",
  "Toán cao cấp",
  "Tài chính doanh nghiệp",
  "Nguyên lý kế toán",
  "Marketing căn bản",
  "Hành vi tổ chức",
  "Quản trị vận hành",
  "Khoa học dữ liệu nhập môn",
  "Nhập môn Lập trình",
  "Cấu trúc dữ liệu & Giải thuật",
  "Thiết kế UI/UX",
  "Hệ quản trị CSDL",
  "Học máy (Machine Learning)",
  "Kinh tế lượng",
  "Thương mại điện tử",
  "Logistics & Chuỗi cung ứng",
];

export function FilterBar({
  fields = DEFAULT_FIELDS,
  subjects = DEFAULT_SUBJECTS,
  value,
  onChange,
  className,
  placeholders = {
    field: "Lĩnh vực...",
    subject: "Môn học...",
  },
}: FilterBarProps) {
  const [internal, setInternal] = React.useState<FilterValue>({
    fields: [],
    subjects: [],
  });

  const current = value ?? internal;

  const setValue = (next: FilterValue) => {
    if (!value) setInternal(next);
    onChange?.(next);
  };

  const toggleItem = (key: keyof FilterValue, item: string) => {
    const set = new Set(current[key]);
    set.has(item) ? set.delete(item) : set.add(item);
    setValue({ ...current, [key]: Array.from(set) });
  };

  const clearAll = () => setValue({ fields: [], subjects: [] });

  const selectedCount =
    (current.fields?.length ?? 0) + (current.subjects?.length ?? 0);

  return (
    <>
      {/* Desktop / Tablet: hiện full filter ngang, co giãn để đặt cùng hàng search bar */}
      <div
        className={cn(
          "hidden sm:flex items-center gap-3 w-full sm:w-auto ",
          className
        )}
      >
        <MultiSelectCombobox
          label="Lĩnh vực"
          placeholder={placeholders.field}
          items={fields}
          selected={current.fields}
          onToggle={(v) => toggleItem("fields", v)}
          className="min-w-[180px]"
        />
        <MultiSelectCombobox
          label="Môn học"
          placeholder={placeholders.subject}
          items={subjects}
          selected={current.subjects}
          onToggle={(v) => toggleItem("subjects", v)}
          className="min-w-[200px]"
        />

        {selectedCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAll}
            className="text-[color:var(--muted-foreground)] hover:text-[color:var(--foreground)] hover:bg-[color:var(--primary)]/5 dark:hover:bg-[color:var(--primary)]/10 rounded-lg transition-colors duration-150"
          >
            <X className="mr-1 h-4 w-4" />
            Xoá tất cả
          </Button>
        )}
      </div>

      {/* Mobile */}
      <div className={cn("sm:hidden", className)}>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              aria-label="Mở bộ lọc"
              className={cn(
                "h-10 w-10 rounded-xl border border-[color:var(--border)] bg-[color:var(--card)] hover:bg-[color:var(--primary)]/5 dark:hover:bg-[color:var(--primary)]/10 transition-colors duration-150"
              )}
            >
              <Filter className="h-4 w-4 text-[color:var(--muted-foreground)]" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="bottom"
            className="space-y-4 pb-4 bg-[color:var(--card)] text-[color:var(--foreground)]"
          >
            <SheetHeader>
              <SheetTitle>Bộ lọc</SheetTitle>
            </SheetHeader>

            <div className="space-y-3">
              <MultiSelectCombobox
                label="Lĩnh vực"
                placeholder={placeholders.field}
                items={fields}
                selected={current.fields}
                onToggle={(v) => toggleItem("fields", v)}
                fullWidth
              />
              <MultiSelectCombobox
                label="Môn học"
                placeholder={placeholders.subject}
                items={subjects}
                selected={current.subjects}
                onToggle={(v) => toggleItem("subjects", v)}
                fullWidth
              />
            </div>

            <SheetFooter className="flex gap-2">
              <Button
                variant="ghost"
                onClick={clearAll}
                className="justify-start text-[color:var(--muted-foreground)] hover:text-[color:var(--foreground)] hover:bg-[color:var(--primary)]/5 dark:hover:bg-[color:var(--primary)]/10 transition-colors duration-150"
              >
                <X className="mr-2 h-4 w-4" />
                Xoá tất cả
              </Button>
              <Button className="ml-auto bg-[color:var(--primary)] text-[color:var(--primary-foreground)] hover:opacity-90 transition-opacity duration-150">
                Áp dụng
              </Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}

/** Multi-select Combobox (Popover + Command + Checkbox) */
function MultiSelectCombobox({
  label,
  placeholder,
  items,
  selected,
  onToggle,
  className,
  fullWidth,
}: {
  label: string;
  placeholder?: string;
  items: string[];
  selected: string[];
  onToggle: (value: string) => void;
  className?: string;
  fullWidth?: boolean;
}) {
  const [open, setOpen] = React.useState(false);

  const count = selected.length;
  const buttonText = count > 0 ? `${label} • ${count}` : placeholder ?? label;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "justify-between h-10 md:h-11 rounded-xl transition-colors duration-150",
            fullWidth ? "w-full" : "w-auto",
            "bg-[color:var(--card)] border border-[color:var(--border)] hover:bg-[color:var(--primary)]/5 dark:hover:bg-[color:var(--primary)]/10"
          )}
        >
          <span
            className={cn(
              "truncate",
              count > 0
                ? "text-[color:var(--foreground)]"
                : "text-[color:var(--muted-foreground)]"
            )}
          >
            {buttonText}
          </span>
          <ChevronsUpDown className="ml-2 h-4 w-4 opacity-60" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className={cn(
          "p-0 bg-[color:var(--card)] border border-[color:var(--border)] shadow-md rounded-xl",
          fullWidth ? "w-[calc(100vw-2rem)] max-w-md" : "min-w-[220px]"
        )}
        align="start"
      >
        <Command>
          <CommandInput
            placeholder={`Tìm ${label.toLowerCase()}...`}
            className="h-10"
          />
          <CommandList>
            <CommandEmpty>Không tìm thấy.</CommandEmpty>
            <CommandGroup>
              {items.map((item) => {
                const isChecked = selected.includes(item);
                return (
                  <CommandItem
                    key={item}
                    value={item}
                    onSelect={() => onToggle(item)}
                    className={cn(
                      "text-[color:var(--foreground)] hover:bg-[color:var(--primary)]/5 dark:hover:bg-[color:var(--primary)]/10",
                      // ép trạng thái focus/selected có cùng style với hover
                      "[&[aria-selected='true']]:bg-[color:var(--primary)]/5 dark:[&[aria-selected='true']]:bg-[color:var(--primary)]/10 [&[aria-selected='true']]:text-[color:var(--foreground)]"
                    )}
                  >
                    <div className="mr-2 flex h-4 w-4 items-center justify-center">
                      <Checkbox
                        checked={isChecked}
                        onCheckedChange={() => onToggle(item)}
                        className="h-4 w-4 rounded border border-[color:var(--border)] data-[state=checked]:bg-[color:var(--primary)] data-[state=checked]:border-[color:var(--primary)]"
                        aria-label={item}
                      />
                    </div>
                    <span className="flex-1 text-[color:var(--foreground)]">
                      {item}
                    </span>
                    {isChecked && (
                      <Check className="ml-2 h-4 w-4 text-[color:var(--primary)]" />
                    )}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default FilterBar;
