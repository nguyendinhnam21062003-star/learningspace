"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { Facebook } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const documents = [
  {
    title: "Đáp án Anh Văn 1",
    author: "UniNest",
    access: "Miễn phí",
    note: "Tài liệu cập nhật liên tục, mọi thắc mắc liên hệ UniNest",
    link: "https://docs.google.com/document/d/1qquRSpuWbNL_tqkfKSWSelYWnOmJGc_YT2_hTSTdW3o/edit?tab=t.0",
  },
  {
    title: "Đáp án Anh Văn 2",
    author: "UniNest",
    access: "Miễn phí",
    note: "Tài liệu cập nhật liên tục, mọi thắc mắc liên hệ UniNest",
    link: "https://docs.google.com/document/d/1tapFf8cXY0lFQHscLrdA7MQCWOn8wGjqUlmkuDg-Uyc/edit?tab=t.0",
  },
  {
    title: "Đáp án Anh Văn 3",
    author: "UniNest",
    access: "Miễn phí",
    note: "Tài liệu cập nhật liên tục, mọi thắc mắc liên hệ UniNest",
    link: "https://docs.google.com/document/d/1Nob-GvduhHY3BR29oJthKEnzTnX59a2TP0pF_L4UfTs/edit?tab=t.0",
  },
  {
    title: "Đáp án Anh Văn 4",
    author: "UniNest",
    access: "Miễn phí",
    note: "Tài liệu cập nhật liên tục, mọi thắc mắc liên hệ UniNest",
    link: "https://docs.google.com/document/d/1gGQCyrtPOH2ozcQBvPZdaL3t1XdqFe3VdH0ikh846-U/edit?tab=t.0",
  },
  {
    title: "Đáp án Anh Văn 5",
    author: "UniNest",
    access: "Miễn phí",
    note: "Tài liệu cập nhật liên tục, mọi thắc mắc liên hệ UniNest",
    link: "https://docs.google.com/document/d/1Wy9PbqMxATudRDMcSKMX9YR48zST0rC3M6txo1VULuo/edit?tab=t.0",
  },
  {
    title: "Đáp án Anh Văn 6",
    author: "UniNest",
    access: "Miễn phí",
    note: "Tài liệu cập nhật liên tục, mọi thắc mắc liên hệ UniNest",
    link: "https://docs.google.com/document/d/19tTFENT0M04upfUtiqdVCxoxh8CH_H-PU-IWFcqckGU/edit?tab=t.0",
  },
  {
    title: "Đáp án Anh Văn 7",
    author: "UniNest",
    access: "Miễn phí",
    note: "Tài liệu cập nhật liên tục, mọi thắc mắc liên hệ UniNest",
    link: "https://docs.google.com/document/d/1datEqbMTihxes4degsaJWS4ntaZxqEZIp_JmpUvQFRg/edit?tab=t.0",
  },
  {
    title: "Đáp án Anh Văn Mooc",
    author: "UniNest",
    access: "Miễn phí",
    note: "Tài liệu cập nhật liên tục, mọi thắc mắc liên hệ UniNest",
    link: "https://docs.google.com/document/d/1KYOxqEzgjRH4hEKtsdbZY1TpUG6OkcDyDdit_3Haefw/edit?tab=t.0",
  },
  {
    title: "Đáp án Anh Văn Tích hợp",
    author: "UniNest",
    access: "Miễn phí",
    note: "Tài liệu cập nhật liên tục, mọi thắc mắc liên hệ UniNest",
    link: "https://docs.google.com/document/d/1HJ9_WbHIxETDuDLlJqKoaCVgDtU6GgG_sT4-2hIVQVY/edit?tab=t.0",
  },
];

export default function TaiLieuHocTapPage() {
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [hideNotice, setHideNotice] = useState(false);

  // group1 = Sinh viên VLU, group2 = Tài liệu học tập
  const [joinedGroups, setJoinedGroups] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("joinedGroups");
      return saved ? JSON.parse(saved) : { group1: false, group2: false };
    }
    return { group1: false, group2: false };
  });

  const [lastTrapTime, setLastTrapTime] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("lastTrapTime");
      return saved ? Number(saved) : 0;
    }
    return 0;
  });

  // Popup hiển thị nếu chưa bị ẩn trong 1h
  useEffect(() => {
    const expiry = localStorage.getItem("hideNoticeUntil");
    if (!expiry || Date.now() > Number(expiry)) {
      setShowPopup(true);
    } else {
      setHideNotice(true);
    }
  }, []);

  const handleHideNotice = () => {
    const oneHourLater = Date.now() + 60 * 60 * 1000;
    localStorage.setItem("hideNoticeUntil", String(oneHourLater));
    setShowPopup(false);
    setHideNotice(true);
  };

  const handleJoinGroup = (groupKey, url) => {
    window.open(url, "_blank");
    const updated = { ...joinedGroups, [groupKey]: true };
    setJoinedGroups(updated);
    localStorage.setItem("joinedGroups", JSON.stringify(updated));
  };

  // Logic bẫy click 30 phút/lần
  const shouldTrap =
    selectedDoc &&
    (!joinedGroups.group1 || !joinedGroups.group2) &&
    Date.now() - lastTrapTime > 30 * 60 * 1000; // 30 phút

  const handleTrapClick = () => {
    if (!joinedGroups.group1) {
      window.open("https://www.facebook.com/groups/969537278407183", "_blank");
    }
    if (!joinedGroups.group2) {
      window.open(
        "https://www.facebook.com/groups/httpswww.facebook.comunishotrohoctap",
        "_blank"
      );
    }
    const now = Date.now();
    localStorage.setItem("lastTrapTime", String(now));
    setLastTrapTime(now);
  };

  const facebookButtons = (
    <div className="flex flex-wrap items-center gap-2">
      <Button
        variant="outline"
        onClick={() =>
          window.open(
            "https://www.facebook.com/profile.php?id=61575981046841",
            "_blank"
          )
        }
      >
        <Facebook size={16} className="text-blue-600" />
        <span className="ml-1">Liên hệ Admin</span>
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          window.open("https://www.facebook.com/unishotrohoctap", "_blank")
        }
      >
        <Facebook size={16} className="text-blue-600" />
        <span className="ml-1">Hỗ trợ học tập</span>
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          window.open(
            "https://www.facebook.com/groups/httpswww.facebook.comunishotrohoctap",
            "_blank"
          )
        }
      >
        <Facebook size={16} className="text-blue-600" />
        <span className="ml-1">Cộng đồng chia sẻ tài liệu VLU</span>
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          window.open(
            "https://www.facebook.com/groups/969537278407183",
            "_blank"
          )
        }
      >
        <Facebook size={16} className="text-blue-600" />
        <span className="ml-1">Cộng đồng sinh viên VLU</span>
      </Button>
    </div>
  );

  return (
    <SidebarProvider
      style={{
        "--sidebar-width": "calc(var(--spacing) * 72)",
        "--header-height": "calc(var(--spacing) * 12)",
      }}
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />

        <div className="p-6 bg-[color:var(--background)] text-[color:var(--foreground)] min-h-screen relative">
          {/* ===== LAYER 1 ===== */}
          {!selectedDoc ? (
            <>
              {facebookButtons}

              <div className="rounded-xl border border-[color:var(--border)] bg-[color:var(--card)] overflow-hidden mt-4">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-[color:var(--muted)]">
                      <TableHead>Tên</TableHead>
                      <TableHead>Người đăng</TableHead>
                      <TableHead>Truy cập</TableHead>
                      <TableHead>Ghi chú</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {documents.map((doc) => (
                      <TableRow
                        key={doc.title}
                        onClick={() => setSelectedDoc(doc)}
                        className="cursor-pointer hover:bg-[color:var(--primary)]/5 transition-colors"
                      >
                        <TableCell className="font-medium text-[color:var(--primary)]">
                          {doc.title}
                        </TableCell>
                        <TableCell>{doc.author}</TableCell>
                        <TableCell>{doc.access}</TableCell>
                        <TableCell className="text-[color:var(--muted-foreground)]">
                          {doc.note}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* ===== POPUP ===== */}
              {showPopup && (
                <Dialog open={showPopup} onOpenChange={setShowPopup}>
                  <DialogContent className="max-w-lg">
                    <DialogHeader>
                      <DialogTitle>Thông báo từ Learning Space</DialogTitle>
                      <DialogDescription asChild>
                        <div className="space-y-4 text-sm leading-relaxed">
                          <p>
                            Các bạn đang truy cập vào trang web{" "}
                            <b>Learning Space</b>, đây là dự án do sinh viên VLU
                            thực hiện với mong muốn xây dựng một không gian học
                            tập, làm việc hiệu quả.
                          </p>
                          <p>
                            Hiện tại vì vướng bận kinh phí nên dự án cần thêm
                            thời gian để phát triển.
                          </p>
                          <p>
                            Hãy tham gia các group sau để nhận tài liệu và trao
                            đổi học tập:
                          </p>

                          <div className="space-y-4">
                            <div className="border rounded-lg p-3">
                              <p className="font-medium">
                                Group: Cộng đồng sinh viên VLU
                              </p>
                              <img
                                src="/images/vlucom.jpg"
                                alt="Group Sinh viên VLU"
                                className="rounded-lg mt-2 mb-2 w-full"
                              />
                              <Button
                                variant="outline"
                                className="w-full"
                                onClick={() =>
                                  handleJoinGroup(
                                    "group1",
                                    "https://www.facebook.com/groups/969537278407183"
                                  )
                                }
                              >
                                Truy cập nhóm
                              </Button>
                            </div>

                            <div className="border rounded-lg p-3">
                              <p className="font-medium">
                                Group: Tài liệu học tập VLU
                              </p>
                              <img
                                src="/images/vludoc.jpg"
                                alt="Group Tài liệu học tập VLU"
                                className="rounded-lg mt-2 mb-2 w-full"
                              />
                              <Button
                                variant="outline"
                                className="w-full"
                                onClick={() =>
                                  handleJoinGroup(
                                    "group2",
                                    "https://www.facebook.com/groups/httpswww.facebook.comunishotrohoctap"
                                  )
                                }
                              >
                                Truy cập nhóm
                              </Button>
                            </div>
                          </div>

                          <div className="text-center mt-4">
                            <Button
                              variant="secondary"
                              onClick={handleHideNotice}
                            >
                              Không hiển thị thông báo này nữa
                            </Button>
                          </div>
                        </div>
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              )}
            </>
          ) : (
            /* ===== LAYER 2 ===== */
            <div className="min-h-screen flex flex-col bg-[color:var(--background)] text-[color:var(--foreground)] relative">
              <div className="flex flex-wrap items-center justify-between gap-2 p-4 border-b border-[color:var(--border)] bg-[color:var(--card)] rounded-t-xl">
                <div className="flex flex-wrap items-center gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setSelectedDoc(null)}
                  >
                    ← Quay lại
                  </Button>
                </div>
                {facebookButtons}
              </div>

              <iframe
                src={selectedDoc.link}
                className="flex-1 w-full border-none"
                style={{ minHeight: "calc(100vh - 56px)" }}
                allowFullScreen
              />

              {/* Overlay bắt click nếu cần */}
              {shouldTrap && (
                <div
                  onClick={handleTrapClick}
                  className="absolute inset-0 z-50 cursor-pointer bg-transparent"
                  title="Nhấn để tiếp tục"
                />
              )}
            </div>
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
