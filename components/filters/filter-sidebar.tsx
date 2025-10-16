"use client";

import * as React from "react";
import { FieldFilter } from "@/components/filters/field-filter";
import { SubjectFilter } from "@/components/filters/subject-filter";

type FilterSidebarProps = {
  fields: any[];
  subjects: any[];
  selectedFields: string[];
  selectedSubjects: string[];
  onChangeFields: (selected: string[], pills: any[]) => void;
  onChangeSubjects: (selected: string[], pills: any[]) => void;
  onOpenFieldDialog: () => void;
  onOpenSubjectDialog: () => void;
};

export function FilterSidebar({
  fields,
  subjects,
  selectedFields,
  selectedSubjects,
  onChangeFields,
  onChangeSubjects,
  onOpenFieldDialog,
  onOpenSubjectDialog,
}: FilterSidebarProps) {
  return (
    <div className="w-72 space-y-4 hidden md:block">
      <FieldFilter
        fields={fields}
        value={selectedFields}
        onChange={(selected, meta) => onChangeFields(selected, meta.pills)}
        onShowMore={onOpenFieldDialog}
      />

      <SubjectFilter
        subjects={subjects}
        value={selectedSubjects}
        onChange={(selected, meta) => onChangeSubjects(selected, meta.pills)}
        onShowMore={onOpenSubjectDialog}
      />
    </div>
  );
}
