"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Folder, BookOpen } from "lucide-react";
import { FilterSidebar } from "@/components/filters/filter-sidebar";
import { FilterPillsBar } from "@/components/filters/filter-pillsBar";
import { FilterResultArea } from "@/components/filters/filter-result-area";
import { SelectMoreDialog } from "@/components/filters/select-more-dialog";

export function FilterSearchPanel() {
  const [filters, setFilters] = React.useState({
    keyword: "",
    fields: [] as string[],
    subjects: [] as string[],
    pills: [] as { type: "field" | "subject"; key: string; label: string }[],
  });

  const allFields = [
    { id: "econ", label: "Kinh tế" },
    { id: "it", label: "Công nghệ thông tin" },
    { id: "edu", label: "Giáo dục" },
    { id: "art", label: "Nghệ thuật" },
    { id: "hr", label: "Quản trị nhân sự" },
    { id: "mkt", label: "Marketing" },
    { id: "fin", label: "Tài chính" },
    { id: "law", label: "Luật" },
  ];

  const allSubjects = [
    { id: "micro", label: "Kinh tế vi mô" },
    { id: "macro", label: "Kinh tế vĩ mô" },
    { id: "math", label: "Toán tài chính" },
    { id: "ai", label: "Trí tuệ nhân tạo" },
    { id: "ds", label: "Khoa học dữ liệu" },
    { id: "ml", label: "Học máy" },
    { id: "dl", label: "Học sâu" },
    { id: "acct", label: "Kế toán" },
    { id: "stat1", label: "Thống kê ứng dụng" },
  ];

  const sidebarFields = allFields.slice(0, 5);
  const sidebarSubjects = allSubjects.slice(0, 5);

  const [openFieldDialog, setOpenFieldDialog] = React.useState(false);
  const [openSubjectDialog, setOpenSubjectDialog] = React.useState(false);

  const buildPills = (fieldIds: string[], subjectIds: string[]) => {
    const fieldPills = fieldIds
      .map((id) => allFields.find((f) => f.id === id))
      .filter(Boolean)
      .map((f) => ({ type: "field" as const, key: f!.id, label: f!.label }));

    const subjectPills = subjectIds
      .map((id) => allSubjects.find((s) => s.id === id))
      .filter(Boolean)
      .map((s) => ({ type: "subject" as const, key: s!.id, label: s!.label }));

    return [...fieldPills, ...subjectPills];
  };

  const handleRemovePill = (key: string) => {
    setFilters((prev) => {
      const newPills = prev.pills.filter((p) => p.key !== key);
      const newFields = newPills
        .filter((p) => p.type === "field")
        .map((p) => p.key);
      const newSubjects = newPills
        .filter((p) => p.type === "subject")
        .map((p) => p.key);
      return {
        ...prev,
        pills: newPills,
        fields: newFields,
        subjects: newSubjects,
      };
    });
  };

  return (
    <div className="flex gap-6 min-h-[80vh] text-[color:var(--foreground)]">
      {/* Cột trái - vùng kết quả */}
      <div className="flex-1 space-y-4">
        {/* Hàng chứa pills */}
        <div className="flex items-center gap-2">
          {/* Icon filter cho mobile */}
          <div className="flex gap-2 md:hidden">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setOpenFieldDialog(true)}
            >
              <Folder size={18} />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setOpenSubjectDialog(true)}
            >
              <BookOpen size={18} />
            </Button>
          </div>

          <FilterPillsBar pills={filters.pills} onRemove={handleRemovePill} />
        </div>

        {/* Kết quả */}
        <FilterResultArea filters={filters} />
      </div>

      {/* Sidebar phải */}
      <FilterSidebar
        fields={sidebarFields}
        subjects={sidebarSubjects}
        selectedFields={filters.fields}
        selectedSubjects={filters.subjects}
        onChangeFields={(selected, pills) =>
          setFilters((prev) => ({
            ...prev,
            fields: selected,
            pills: [...prev.pills.filter((p) => p.type !== "field"), ...pills],
          }))
        }
        onChangeSubjects={(selected, pills) =>
          setFilters((prev) => ({
            ...prev,
            subjects: selected,
            pills: [
              ...prev.pills.filter((p) => p.type !== "subject"),
              ...pills,
            ],
          }))
        }
        onOpenFieldDialog={() => setOpenFieldDialog(true)}
        onOpenSubjectDialog={() => setOpenSubjectDialog(true)}
      />

      {/* Dialogs */}
      <SelectMoreDialog
        open={openFieldDialog}
        onOpenChange={setOpenFieldDialog}
        title="Tất cả lĩnh vực"
        description="Chọn một hoặc nhiều lĩnh vực để thu hẹp kết quả."
        items={allFields}
        selected={filters.fields}
        onApply={(next) =>
          setFilters((prev) => ({
            ...prev,
            fields: next,
            pills: buildPills(next, prev.subjects),
          }))
        }
        searchPlaceholder="Tìm lĩnh vực..."
      />

      <SelectMoreDialog
        open={openSubjectDialog}
        onOpenChange={setOpenSubjectDialog}
        title="Tất cả môn học"
        description="Chọn một hoặc nhiều môn học để thu hẹp kết quả."
        items={allSubjects}
        selected={filters.subjects}
        onApply={(next) =>
          setFilters((prev) => ({
            ...prev,
            subjects: next,
            pills: buildPills(prev.fields, next),
          }))
        }
        searchPlaceholder="Tìm môn học..."
      />
    </div>
  );
}
