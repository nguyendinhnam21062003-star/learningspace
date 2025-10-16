"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

// 3 component con (kebab-case)
import { SearchBar } from "@/components/common/search-bar";
import { FilterBar } from "@/components/common/filter-bar";
import { TabsSwitch } from "@/components/common/tabs-switch";

type ListHeaderProps = {
  // Search
  searchPlaceholder?: string;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  onSearchSubmit?: (value: string) => void;

  // Filters
  fields?: string[];
  subjects?: string[];
  filtersValue?: { fields: string[]; subjects: string[] };
  onFiltersChange?: (next: { fields: string[]; subjects: string[] }) => void;

  // Tabs
  tabs?: { value: string; label: string }[];
  tabValue?: string; // controlled
  defaultTabValue?: string; // uncontrolled fallback
  onTabChange?: (value: string) => void;

  // Layout
  className?: string;
  wrapClassName?: string; // lớp cho row search + filter
  showSearch?: boolean; // bật/tắt từng phần (mặc định bật)
  showFilters?: boolean;
  showTabs?: boolean;
};

export function ListHeader({
  // Search
  searchPlaceholder = "Tìm kiếm...",
  searchValue,
  onSearchChange,
  onSearchSubmit,

  // Filters
  fields,
  subjects,
  filtersValue,
  onFiltersChange,

  // Tabs
  tabs,
  tabValue,
  defaultTabValue,
  onTabChange,

  // Layout
  className,
  wrapClassName,
  showSearch = true,
  showFilters = true,
  showTabs = true,
}: ListHeaderProps) {
  return (
    <header className={cn("w-full space-y-4", className)}>
      {/* Row: Search + Filter (nằm cùng hàng, tự xuống dòng nếu hẹp) */}
      <div
        className={cn(
          "flex flex-wrap items-center gap-3",
          // Ưu tiên search chiếm không gian, filter tự co giãn
          // SearchBar đã có flex-1, FilterBar tự width theo nội dung
          wrapClassName
        )}
      >
        {showSearch && (
          <SearchBar
            placeholder={searchPlaceholder}
            value={searchValue}
            onChange={onSearchChange}
            onSubmit={onSearchSubmit}
            // Cho phép search co giãn tối đa khi đặt cạnh Filter
            className="flex-1"
          />
        )}

        {showFilters && (
          <FilterBar
            fields={fields}
            subjects={subjects}
            value={filtersValue}
            onChange={onFiltersChange}
          />
        )}
      </div>

      {/* Tabs: button-like, căn trái, auto width, đồng bộ tone */}
      {showTabs && (
        <TabsSwitch
          tabs={tabs}
          value={tabValue}
          defaultValue={defaultTabValue}
          onChange={onTabChange}
        />
      )}
    </header>
  );
}

export default ListHeader;
