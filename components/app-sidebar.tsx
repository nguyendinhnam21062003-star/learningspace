"use client";

import * as React from "react";
import {
  Bell,
  BookOpen,
  Briefcase,
  GraduationCap,
  Home,
  Info,
  MoreHorizontal,
  School,
  Settings,
  UserCircle,
  UserCog,
  Users,
} from "lucide-react";

import { NavDocuments } from "@/components/nav-documents";
import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Trang chủ",
      url: "#",
      icon: Home,
    },
    {
      title: "Thư viện tài liệu",
      url: "#",
      icon: BookOpen,
    },
    {
      title: "Tutor",
      url: "#",
      icon: Users,
    },
    {
      title: "Khóa học",
      url: "#",
      icon: GraduationCap,
    },
    {
      title: "Dịch vụ",
      url: "#",
      icon: Briefcase,
    },
    {
      title: "Khác",
      url: "#",
      icon: MoreHorizontal,
    },
  ],
  navPersonal: [
    {
      name: "Trang cá nhân",
      url: "#",
      icon: UserCircle,
    },
    {
      name: "Thông báo",
      url: "#",
      icon: Bell,
    },
    {
      name: "Tài khoản",
      url: "#",
      icon: UserCog,
    },
  ],
  navSecondary: [
    {
      title: "Cài đặt",
      url: "#",
      icon: Settings,
    },
    {
      title: "Giới thiệu",
      url: "#",
      icon: Info,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <School className="!size-5" />
                <span className="text-base font-semibold">Learning Space</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} label="Nội dung" />
        <NavDocuments items={data.navPersonal} label="Cá nhân" />
        <NavSecondary
          items={data.navSecondary}
          label="Hệ thống"
          className="mt-auto"
        />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
