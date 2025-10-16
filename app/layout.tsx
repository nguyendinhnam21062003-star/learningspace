import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { url } from "zod";
import { Analytics } from "@vercel/analytics/next";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "LearningSpace | UniNest - Tài liệu học tập VLU",
  description:
    "Nơi chia sẻ tài liệu, khóa học và dịch vụ hỗ trợ sinh viên VLU.",
  openGraph: {
    title: "LearningSpace - Tài liệu học tập VLU",
    description:
      "Khám phá kho tài liệu và khóa học chất lượng dành cho sinh viên VLU.",
    url: "https://learningspace.vercel.app",
    siteName: "LearningSpace",
    images: [
      {
        url: "/images/learningspace.jpg", // đặt ảnh của bạn
        width: 1200,
        height: 630,
        alt: "LearningSpace Preview",
      },
    ],
    locale: "vi_VN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
