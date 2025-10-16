"use client";

import * as React from "react";
import { IconBook } from "@tabler/icons-react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BookmarkPlus } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const COURSES = [
  {
    id: "c1",
    title: "Next.js 15 Fundamentals",
    subject: "Web Dev",
    description:
      "Học kiến trúc App Router, server actions và tối ưu hóa render cho dự án production.",
    author: { name: "Lê Minh Quân" },
    price: "1.000.000đ",
  },
  {
    id: "c2",
    title: "Tailwind CSS Pro Design",
    subject: "UI/UX",
    description:
      "Thiết kế responsive hiện đại với container queries, grid và utilities nâng cao.",
    author: { name: "Trần Gia Huy" },
    price: "$39",
  },
  {
    id: "c3",
    title: "TypeScript for Backend",
    subject: "Backend",
    description:
      "Nắm type-safety, generics, module patterns và thực chiến với Express/Prisma.",
    author: { name: "Ngô Thanh Tùng" },
    price: "$49",
  },
  {
    id: "c4",
    title: "Data Visualization với D3",
    subject: "Data Viz",
    description:
      "Xây biểu đồ tương tác, scale, transition và binding dữ liệu hiệu quả.",
    author: { name: "Phạm Ngọc Anh" },
    price: "$69",
  },
  {
    id: "c5",
    title: "React Performance Tuning",
    subject: "Frontend",
    description:
      "Concurrent features, memoization, virtualization và profiling nâng cao.",
    author: { name: "Nguyễn Đức Thắng" },
    price: "$55",
  },
  {
    id: "c6",
    title: "SQL for Analysts",
    subject: "Data",
    description:
      "Viết truy vấn tối ưu, window functions, CTE và thiết kế lược đồ cơ bản.",
    author: { name: "Đỗ Bảo Long" },
    price: "$35",
  },
];

export function GridCourse() {
  return (
    <div
      className="
      grid gap-6
      grid-cols-1
      sm:grid-cols-1
      md:grid-cols-1
      lg:grid-cols-2
      xl:grid-cols-4
      2xl:grid-cols-4
      items-stretch
    "
    >
      {COURSES.map((c) => (
        <Card
          key={c.id}
          className="relative overflow-hidden border bg-gradient-to-t from-primary/5 to-card dark:from-primary/10 dark:to-card shadow-sm hover:shadow-md transition-shadow flex flex-col"
        >
          {/* ICON TOOLTIP */}
          <div className="absolute right-2 top-2 z-10">
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="rounded-full p-1 hover:bg-muted transition-colors">
                  <BookmarkPlus className="size-6" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="left" align="center" className="text-xs">
                Thêm vào thư viện
              </TooltipContent>
            </Tooltip>
          </div>

          {/* HEADER - ẢNH SÁT MÉP */}
          <CardHeader className="-mt-7 -mx-6 p-0 overflow-hidden rounded-t-xl">
            <div className="aspect-[16/9] w-full bg-muted/60" />
          </CardHeader>

          {/* BODY */}
          <CardContent className="flex-1 flex flex-col gap-3 px-6 -mt-4">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">
                {c.subject}
              </Badge>
              <Badge
                variant="outline"
                className="ml-auto gap-1 bg-primary text-primary-foreground"
              >
                <IconBook className="size-3.5" />
                Khóa học
              </Badge>
            </div>

            <CardTitle className="line-clamp-2 text-lg font-semibold">
              {c.title}
            </CardTitle>

            <p className="line-clamp-3 text-sm text-muted-foreground flex-1">
              {c.description}
            </p>
          </CardContent>

          {/* FOOTER */}
          <CardFooter className="mt-auto flex items-center justify-between px-6 pt-0">
            <div className="flex items-center gap-3">
              <Avatar className="size-8">
                <div className="w-full h-full rounded-full bg-muted" />
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-medium leading-tight">
                  {c.author.name}
                </span>
                <span className="text-xs text-muted-foreground">Tác giả</span>
              </div>
            </div>

            <div className="text-right text-base font-semibold">{c.price}</div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
