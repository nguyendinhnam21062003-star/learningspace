"use client";

import * as React from "react";
import { GridCourse } from "@/components/grid-course";
import { DocumentsTable } from "@/components/documents-table";

type FilterResultAreaProps = {
  filters: {
    fields: string[];
    subjects: string[];
    pills: any[];
  };
};

// Dữ liệu demo gốc (sau này có thể fetch từ API)
const demoDocuments = [
  {
    id: "1",
    title: "Phân tích Marketing trong ngành đồ uống",
    field: "Marketing",
    subject: "Kinh tế vi mô",
    author: "Nguyễn Văn A",
    date: "2024-09-12",
  },
  {
    id: "2",
    title: "Ứng dụng Machine Learning trong giáo dục",
    field: "Công nghệ thông tin",
    subject: "Trí tuệ nhân tạo",
    author: "Trần Thị B",
    date: "2025-01-05",
  },
  {
    id: "3",
    title: "Tài chính vi mô tại Việt Nam",
    field: "Tài chính",
    subject: "Kinh tế vi mô",
    author: "Lê Văn C",
    date: "2023-11-10",
  },
];

// ✅ Map ID → tên hiển thị
const fieldMap: Record<string, string> = {
  econ: "Kinh tế",
  it: "Công nghệ thông tin",
  edu: "Giáo dục",
  art: "Nghệ thuật",
  hr: "Quản trị nhân sự",
  mkt: "Marketing",
  fin: "Tài chính",
  law: "Luật",
};

const subjectMap: Record<string, string> = {
  micro: "Kinh tế vi mô",
  macro: "Kinh tế vĩ mô",
  math: "Toán tài chính",
  ai: "Trí tuệ nhân tạo",
  ds: "Khoa học dữ liệu",
  ml: "Học máy",
  dl: "Học sâu",
  acct: "Kế toán",
  stat1: "Thống kê ứng dụng",
};

export function FilterResultArea({ filters }: FilterResultAreaProps) {
  const hasFilter = filters.fields.length > 0 || filters.subjects.length > 0;

  // ✅ Áp dụng lọc dựa trên ID → tên
  const filteredDocs = demoDocuments.filter((doc) => {
    const matchField =
      filters.fields.length === 0 ||
      filters.fields.some((f) => doc.field === fieldMap[f]);

    const matchSubject =
      filters.subjects.length === 0 ||
      filters.subjects.some((s) => doc.subject === subjectMap[s]);

    return matchField && matchSubject;
  });

  return (
    <div className="rounded-xl border border-[color:var(--border)] bg-[color:var(--card)] p-4 text-sm w-full min-h-[400px]">
      <p className="font-medium mb-4">Kết quả hiện tại:</p>

      {hasFilter ? (
        filteredDocs.length > 0 ? (
          <DocumentsTable documents={filteredDocs} />
        ) : (
          <p className="text-muted-foreground text-sm">
            Trang web đang được hoàn thiện dần cho nên chưa có tài liệu phù hợp
            với tìm kiếm của bạn. Nếu cần hỗ trợ môn học bạn có thể liên hệ tới:{" "}
            UniS{" "}
            <a
              href="https://www.facebook.com/unishotrohoctap"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Click tại đây.
            </a>
            <p>
              Chúng tôi sẽ cố gắng hoàn thiện để mang tới các bạn trải nghiệm
              học tập, làm việc tốt nhất.
            </p>
          </p>
        )
      ) : (
        <GridCourse />
      )}
    </div>
  );
}
