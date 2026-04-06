import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import MotionProvider from "@/components/MotionProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nova — Verify Before You Ship. Every Time.",
  description:
    "Nova is a Claude Code plugin that acts as a Quality Gate for AI-assisted development. Independent evaluation, multi-AI cross-verification, and design-implementation gap detection.",
  keywords: ["Nova", "Claude Code", "AI", "Quality Gate", "code review", "verification"],
  openGraph: {
    title: "Nova — Verify Before You Ship. Every Time.",
    description:
      "AI가 만든 코드의 진짜 병목을 잡는 Quality Gate. Generator-Evaluator 분리, 5차원 검증, Hard-Block 자동 분류.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#0a0a0f] text-[#f0f0ff]">
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
