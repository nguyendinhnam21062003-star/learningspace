"use client";

import * as React from "react";
import AutoScroll from "embla-carousel-auto-scroll";
import { IconBook } from "@tabler/icons-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
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

type Course = {
  id: string;
  title: string;
  subject: string;
  description: string;
  author: { name: string; avatar?: string };
  price: string;
};

const COURSES: Course[] = [
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
  {
    id: "c7",
    title: "Machine Learning 101",
    subject: "AI/ML",
    description:
      "Pipeline ML, feature engineering và đánh giá mô hình cho người mới bắt đầu.",
    author: { name: "Vũ Minh Khang" },
    price: "$79",
  },
  {
    id: "c8",
    title: "Product Thinking cho Dev",
    subject: "Product",
    description:
      "Tư duy ưu tiên, đo lường tác động và giao tiếp cross-functional trong team.",
    author: { name: "Hoàng Hà My" },
    price: "$29",
  },
];

export function SectionCards() {
  const plugin = React.useRef(
    AutoScroll({
      speed: 1,
      startDelay: 2000,
      direction: "forward",
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    })
  );

  const [api, setApi] = React.useState<CarouselApi | null>(null);

  return (
    <div className="w-full">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[plugin.current]}
        setApi={setApi}
        className="w-full"
      >
        <CarouselContent className="gap-x-0">
          {COURSES.map((c) => (
            <CarouselItem
              key={c.id}
              className="basis-[80%] sm:basis-[52%] lg:basis-[30%] xl:basis-[21%]"
            >
              <div className="p-2 h-full">
                <Card className="h-full flex flex-col justify-between relative overflow-hidden border bg-gradient-to-t from-primary/6 to-card dark:from-primary/11 dark:to-card text-card-foreground shadow-sm hover:shadow-md transition-shadow !pb-0">
                  {/* ICON TOOLTIP */}
                  <div className="absolute right-2 top-2 z-10">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button className="rounded-full p-1 hover:bg-muted transition-colors">
                          <BookmarkPlus className="size-6" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent
                        side="left"
                        align="center"
                        className="text-xs"
                      >
                        Thêm vào thư viện
                      </TooltipContent>
                    </Tooltip>
                  </div>

                  {/* HEADER */}
                  <CardHeader className="-mt-6 !px-0 !pb-0">
                    <div className="aspect-[16/9] w-full bg-muted/60 rounded-t-xl" />
                  </CardHeader>

                  {/* BODY */}
                  <CardContent className="-mt-9 flex flex-col gap-3 p-4">
                    <div className="flex items-center gap-2 ">
                      <Badge variant="outline" className="text-xs">
                        {c.subject}
                      </Badge>
                      <Badge
                        variant="outline"
                        className="ml-auto gap-1 bg-primary text-primary-foreground"
                      >
                        <IconBook className="size-3.5 " />
                        Khóa học
                      </Badge>
                    </div>

                    <CardTitle className="line-clamp-2 text-lg font-semibold">
                      {c.title}
                    </CardTitle>

                    <p className="line-clamp-3 text-sm text-muted-foreground">
                      {c.description}
                    </p>
                  </CardContent>

                  {/* FOOTER */}
                  <CardFooter className="-mt-6 flex items-center justify-between p-4 pt-0">
                    <div className="flex items-center gap-3">
                      <Avatar className="size-8">
                        {c.author.avatar ? (
                          <AvatarImage
                            src={c.author.avatar}
                            alt={c.author.name}
                          />
                        ) : (
                          <AvatarFallback>
                            {c.author.name
                              .split(" ")
                              .slice(0, 2)
                              .map((s) => s[0])
                              .join("")
                              .toUpperCase()}
                          </AvatarFallback>
                        )}
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium leading-tight">
                          {c.author.name}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          Tác giả
                        </span>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-base font-semibold">{c.price}</div>
                    </div>
                  </CardFooter>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Nút Previous */}
        <CarouselPrevious
          onClick={() => {
            api?.scrollPrev();
            plugin.current.reset(); // reset auto-scroll timer
          }}
          className="absolute left-2 top-1/2 -translate-y-1/2"
        />

        <CarouselNext
          onClick={() => {
            api?.scrollNext();
            plugin.current.reset(); // reset auto-scroll timer
          }}
          className="absolute right-2 top-1/2 -translate-y-1/2"
        />
      </Carousel>
    </div>
  );
}
