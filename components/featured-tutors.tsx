"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import { BookmarkPlus } from "lucide-react";
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
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// ==========================
// Data
// ==========================
type Tutor = {
  id: string;
  name: string;
  headline: string;
  bio: string;
  avatar?: string;
  tags: string[];
};

const TUTORS: Tutor[] = [
  {
    id: "t1",
    name: "Nguyễn Hải Đăng",
    headline: "Senior Data Scientist @ FinTech",
    bio: "10+ năm kinh nghiệm ML/AI, tối ưu mô hình & triển khai sản phẩm dữ liệu quy mô lớn.",
    tags: ["Machine Learning", "MLOps", "Python", "SQL"],
  },
  {
    id: "t2",
    name: "Trần Hoài Thương",
    headline: "Product Designer | ex-EdTech",
    bio: "Tư duy sản phẩm, thiết kế design system, mentoring chuyển nghề UI/UX.",
    tags: ["Product Thinking", "UI/UX", "Design System", "Figma"],
  },
  {
    id: "t3",
    name: "Lê Phước Lộc",
    headline: "Staff Backend Engineer",
    bio: "Kiến trúc microservices, tối ưu hiệu năng, code review thực chiến.",
    tags: ["Node.js", "PostgreSQL", "System Design", "Cloud"],
  },
  {
    id: "t4",
    name: "Phạm Khánh Linh",
    headline: "Marketing Analytics Lead",
    bio: "Phân tích dữ liệu marketing, A/B testing, đo lường ROI đa kênh.",
    tags: ["Analytics", "Experimentation", "SQL", "Tableau"],
  },
  {
    id: "t5",
    name: "Đặng Tấn Phát",
    headline: "Mobile Engineer | React Native",
    bio: "Xây app đa nền tảng, tối ưu bundle & performance, CI/CD cho mobile.",
    tags: ["React Native", "TypeScript", "Redux", "CI/CD"],
  },
  {
    id: "t6",
    name: "Hoàng Trúc Vy",
    headline: "Data Engineer | Cloud",
    bio: "Thiết kế pipeline ETL/ELT, lakehouse, quản trị dữ liệu trên đám mây.",
    tags: ["Airflow", "Spark", "BigQuery", "GCP"],
  },
  {
    id: "t7",
    name: "Vũ Nhật Nam",
    headline: "DevOps/SRE",
    bio: "Hệ thống tin cậy cao, autoscaling, observability và hạ tầng IaC.",
    tags: ["Kubernetes", "Terraform", "Prometheus", "AWS"],
  },
  {
    id: "t8",
    name: "Lâm Bảo Châu",
    headline: "Frontend Architect",
    bio: "App router, module federation, performance & DX cho team lớn.",
    tags: ["Next.js", "Vite", "Performance", "Monorepo"],
  },
  {
    id: "t9",
    name: "Trịnh Minh Tâm",
    headline: "Business Analyst | Fintech",
    bio: "E2E requirement, số hóa quy trình, và thiết kế giải pháp khả thi.",
    tags: ["BA", "UML/BPMN", "Product", "SQL"],
  },
];

// ==========================
// Component
// ==========================
export function FeaturedTutors() {
  const plugin = React.useRef(
    Autoplay({
      delay: 8000,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    })
  );
  const [api, setApi] = React.useState<CarouselApi | null>(null);

  return (
    <Card className="@container/card">
      {/* Header giống ChartAreaInteractive */}
      <CardHeader>
        <CardTitle>Tutors nổi bật</CardTitle>
      </CardHeader>

      {/* Nội dung chính */}
      <CardContent className="px-2 pt-2 sm:px-6 sm:pt-0">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[plugin.current]}
          setApi={setApi}
          className="w-full"
        >
          <CarouselContent className="gap-x-0 items-stretch">
            {TUTORS.map((t) => (
              <CarouselItem
                key={t.id}
                className="basis-[80%] sm:basis-[52%] lg:basis-[30%] xl:basis-[21%]"
              >
                <div className="p-2 h-full">
                  <Card className="relative h-full overflow-hidden border bg-gradient-to-t from-primary/6 to-card dark:from-primary/11 dark:to-card text-card-foreground shadow-sm hover:shadow-md transition-shadow !pb-0">
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
                          Theo dõi tutor
                        </TooltipContent>
                      </Tooltip>
                    </div>

                    {/* HEADER */}
                    <div className="-mt-6 aspect-[16/9] w-full bg-muted/60 rounded-t-xl relative">
                      <div className="absolute -bottom-6 left-4 right-4 flex items-center gap-3">
                        <Avatar className="size-12 ring-2 ring-background shadow-sm">
                          {t.avatar ? (
                            <AvatarImage src={t.avatar} alt={t.name} />
                          ) : (
                            <AvatarFallback>
                              {t.name
                                .split(" ")
                                .slice(0, 2)
                                .map((s) => s[0])
                                .join("")
                                .toUpperCase()}
                            </AvatarFallback>
                          )}
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <CardTitle className="text-base leading-tight line-clamp-1">
                            {t.name}
                          </CardTitle>
                          <p className="text-xs text-muted-foreground line-clamp-1">
                            {t.headline}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* BODY */}
                    <CardContent className="-mt-2 flex flex-col gap-3 p-4">
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {t.tags.slice(0, 3).map((tag) => (
                          <Badge
                            key={tag}
                            variant="outline"
                            className="text-xs max-w-[128px] truncate"
                            title={tag}
                          >
                            {tag}
                          </Badge>
                        ))}
                        {t.tags.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            …
                          </Badge>
                        )}
                      </div>

                      <p className="line-clamp-3 text-sm text-muted-foreground">
                        {t.bio}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Nút điều hướng */}
          <CarouselPrevious
            onClick={() => {
              api?.scrollPrev();
              plugin.current.reset();
            }}
            className="absolute left-2 top-1/2 -translate-y-1/2"
          />
          <CarouselNext
            onClick={() => {
              api?.scrollNext();
              plugin.current.reset();
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2"
          />
        </Carousel>
      </CardContent>
    </Card>
  );
}
