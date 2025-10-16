"use client";

import * as React from "react";
import { X, Search } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Folder } from "lucide-react";
// Kiểu item dùng chung cho field/subject

export type SelectMoreItem = {
  id: string;
  label: string;
  count?: number;
};

export type SelectMoreDialogProps = {
  /** Mở/đóng dialog */
  open: boolean;
  onOpenChange: (v: boolean) => void;

  /** Tiêu đề hiển thị trên dialog (VD: "Tất cả môn học" hoặc "Tất cả lĩnh vực") */
  title: string;
  /** Mô tả ngắn cho dialog */
  description?: string;

  /** Danh sách đầy đủ để chọn */
  items: SelectMoreItem[];
  /** Danh sách ID đang được chọn ở bên ngoài (nguồn sự thật) */
  selected: string[];
  /** Callback khi bấm "Áp dụng" */
  onApply: (nextSelected: string[]) => void;

  /** Tùy chọn hiển thị số lượng ở bên phải mỗi item */
  showCounts?: boolean;
  /** Placeholder cho ô tìm kiếm */
  searchPlaceholder?: string;
  /** Label nút Áp dụng/Hủy (i18n) */
  applyLabel?: string;
  cancelLabel?: string;
  /** Lớp CSS bổ sung */
  className?: string;
};

export function SelectMoreDialog({
  open,
  onOpenChange,
  title,
  description,
  items,
  selected,
  onApply,
  showCounts = true,
  searchPlaceholder = "Tìm kiếm...",
  applyLabel = "Áp dụng",
  cancelLabel = "Hủy",
  className,
}: SelectMoreDialogProps) {
  // Trạng thái tạm thời trong dialog để người dùng thao tác trước khi confirm
  const [tempSelected, setTempSelected] = React.useState<string[]>(selected);
  const [query, setQuery] = React.useState<string>("");

  // Mỗi lần mở dialog, đồng bộ tempSelected với selected từ ngoài vào
  React.useEffect(() => {
    if (open) {
      setTempSelected(selected);
      setQuery("");
    }
  }, [open, selected]);

  // Lọc theo từ khóa
  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((it) => it.label.toLowerCase().includes(q));
  }, [items, query]);

  const allVisibleIds = React.useMemo(
    () => filtered.map((it) => it.id),
    [filtered]
  );

  const toggle = (id: string) => {
    setTempSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleApply = () => {
    onApply(tempSelected);
    onOpenChange(false);
  };
  const [activeDialog, setActiveDialog] = React.useState<
    "fields" | "subjects" | null
  >(null);
  return (
    <Dialog open={open} onOpenChange={onOpenChange} modal={false}>
      <DialogContent
        className={cn(
          "sm:max-w-[720px] max-h-[90vh] overflow-y-auto transition-none", // ✅
          className
        )}
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className="text-[color:var(--foreground)]">
            {title}
          </DialogTitle>
          {description && (
            <DialogDescription className="text-[color:var(--muted-foreground)]">
              {description}
            </DialogDescription>
          )}
        </DialogHeader>

        {/* Thanh công cụ: tìm kiếm + thống kê lựa chọn */}
        {/* Thanh tìm kiếm và đếm tổng số lựa chọn */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search
              size={16}
              className="absolute left-2 top-1/2 -translate-y-1/2"
            />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={searchPlaceholder}
              className="pl-8"
              aria-label="Tìm kiếm"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="none"
            />
          </div>

          <Badge variant="outline" className="whitespace-nowrap">
            Đã chọn {tempSelected.length}
          </Badge>
        </div>

        {/* ✅ Pills chuyển xuống một dòng riêng */}
        {tempSelected.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 mt-3">
            {tempSelected.map((id) => {
              const label = items.find((it) => it.id === id)?.label;
              return (
                <Badge
                  key={id}
                  variant="outline"
                  className="flex items-center gap-1 bg-[color:var(--muted)] text-[color:var(--foreground)]"
                >
                  <span>{label}</span>
                  <button
                    type="button"
                    onClick={() => toggle(id)}
                    aria-label={`Xóa ${label}`}
                  >
                    <X size={12} />
                  </button>
                </Badge>
              );
            })}
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setTempSelected([])}
              className="text-[color:var(--destructive)]"
            >
              Xóa tất cả
            </Button>
          </div>
        )}

        {/* Danh sách dài có cuộn */}
        <ScrollArea className="max-h-[60vh] sm:h-[500px] rounded-md border border-[color:var(--border)]">
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 p-3">
            {filtered.map((it) => {
              const checked = tempSelected.includes(it.id);
              return (
                <li key={it.id}>
                  <label className="flex items-center gap-2 cursor-pointer select-none border rounded-lg px-3 py-2 hover:bg-[color:var(--muted)] transition-colors">
                    <Checkbox
                      checked={checked}
                      onCheckedChange={() => toggle(it.id)}
                      className="h-4 w-4 border border-[color:var(--border)] data-[state=checked]:bg-[color:var(--primary)]"
                    />
                    <Folder
                      size={16}
                      className="text-[color:var(--muted-foreground)]"
                    />
                    <span className="text-sm text-[color:var(--foreground)] truncate">
                      {it.label}
                    </span>
                  </label>
                </li>
              );
            })}
          </ul>
        </ScrollArea>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            type="button"
            variant="ghost"
            onClick={() => onOpenChange(false)}
          >
            {cancelLabel}
          </Button>
          <Button type="button" onClick={handleApply}>
            {applyLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
