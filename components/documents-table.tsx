"use client";

import * as React from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from "@/components/ui/table"; // ✅ tái sử dụng từ table.tsx
import { cn } from "@/lib/utils";

export type DocumentItem = {
  id: string;
  title: string;
  field: string;
  subject: string;
  author: string;
  date: string;
};

type DocumentsTableProps = {
  documents: DocumentItem[];
  className?: string;
};

export function DocumentsTable({ documents, className }: DocumentsTableProps) {
  const hasDocs = documents && documents.length > 0;

  return (
    <div
      className={cn(
        "rounded-xl border border-[color:var(--border)] bg-[color:var(--card)] p-4",
        className
      )}
    >
      <h3 className="text-base font-semibold mb-3 text-[color:var(--foreground)]">
        Danh sách tài liệu
      </h3>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Tên tài liệu</TableHead>
            <TableHead>Lĩnh vực</TableHead>
            <TableHead>Môn học</TableHead>
            <TableHead>Tác giả</TableHead>
            <TableHead>Ngày đăng</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {hasDocs ? (
            documents.map((doc) => (
              <TableRow key={doc.id}>
                <TableCell className="font-medium text-[color:var(--primary)]">
                  {doc.title}
                </TableCell>
                <TableCell>{doc.field}</TableCell>
                <TableCell>{doc.subject}</TableCell>
                <TableCell>{doc.author}</TableCell>
                <TableCell>{doc.date}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-sm py-6">
                Chưa có tài liệu nào được hiển thị.
              </TableCell>
            </TableRow>
          )}
        </TableBody>

        <TableCaption>
          {hasDocs
            ? `Tổng cộng ${documents.length} tài liệu`
            : "Không có dữ liệu để hiển thị."}
        </TableCaption>
      </Table>
    </div>
  );
}
