"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils"; // shadcn helper (đã có sẵn trong hầu hết dự án)
import { Search, X } from "lucide-react";

type SearchBarProps = {
  placeholder?: string;
  value?: string; // nếu truyền -> trở thành controlled
  defaultValue?: string; // nếu không truyền value -> dùng internal state
  autoFocus?: boolean;
  allowClear?: boolean; // hiển thị nút X để xóa nhanh
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void; // Enter / submit form
  className?: string; // class cho container
  inputClassName?: string; // class cho input
};

export function SearchBar({
  placeholder = "Tìm kiếm...",
  value,
  defaultValue = "",
  autoFocus = false,
  allowClear = true,
  onChange,
  onSubmit,
  className,
  inputClassName,
}: SearchBarProps) {
  const isControlled = typeof value === "string";
  const [internal, setInternal] = React.useState<string>(defaultValue);

  const current = isControlled ? (value as string) : internal;

  // Submit trên Enter
  const submit = React.useCallback(
    (e?: React.FormEvent<HTMLFormElement>) => {
      e?.preventDefault();
      onSubmit?.(current.trim());
    },
    [current, onSubmit]
  );

  const handleChange = (v: string) => {
    if (!isControlled) setInternal(v);
    onChange?.(v);
  };

  const clear = () => {
    handleChange("");
  };

  return (
    <form
      onSubmit={submit}
      className={cn(
        "relative flex-1 min-w-[220px] md:min-w-[280px] max-w-full",
        className
      )}
      role="search"
      aria-label="Tìm kiếm"
    >
      {/* Icon kính lúp */}
      <Search
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[color:var(--muted-foreground)]"
        aria-hidden="true"
      />

      <Input
        value={current}
        onChange={(e) => handleChange(e.target.value)}
        placeholder={placeholder}
        autoFocus={autoFocus}
        className={cn(
          "pl-9 pr-9 h-10 md:h-11 rounded-xl",
          // Màu chuẩn neutral token
          "bg-[color:var(--card)] text-[color:var(--foreground)] placeholder-[color:var(--muted-foreground)]",
          "border border-[color:var(--border)]",
          // Focus ring theo system
          "focus-visible:ring-2 focus-visible:ring-[color:var(--ring)] focus-visible:border-[color:var(--primary)]",

          inputClassName
        )}
      />

      {/* Nút clear */}
      {allowClear && current && (
        <button
          type="button"
          onClick={clear}
          aria-label="Xóa nội dung tìm kiếm"
          className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex h-7 w-7 items-center justify-center rounded-md  text-[color:var(--muted-foreground)] transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </form>
  );
}

export default SearchBar;
