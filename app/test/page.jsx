"use client";

import * as React from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

import { FilterSearchPanel } from "@/components/filters/filter-search-panel";
// 🧩 Import thêm SubjectFilter
import { SubjectFilter } from "@/components/filters/subject-filter";

export default function Page() {
  // mock data
  const subjects = [
    { id: "math", label: "Toán học", count: 42 },
    { id: "physics", label: "Vật lý", count: 18 },
    { id: "chemistry", label: "Hóa học", count: 25 },
    { id: "biology", label: "Sinh học", count: 11 },
    { id: "literature", label: "Ngữ văn", count: 30 },
    { id: "english", label: "Tiếng Anh", count: 54 },
  ];

  return (
    <SidebarProvider
      style={{
        "--sidebar-width": "calc(var(--spacing) * 72)",
        "--header-height": "calc(var(--spacing) * 12)",
      }}
    >
      {/* ===== SIDEBAR ===== */}
      <AppSidebar variant="inset" />

      {/* ===== PHẦN NỘI DUNG ===== */}
      <SidebarInset>
        {/* HEADER TRÊN CÙNG */}
        <SiteHeader />

        <div className="p-6">
          <FilterSearchPanel />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
