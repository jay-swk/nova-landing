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

const SITE_URL = "https://jay-swk.github.io/nova-landing";

export const metadata: Metadata = {
  title: "Nova — AI Agent Ops Framework for Claude Code",
  description:
    "Nova는 Claude Code에서 AI 에이전트의 환경, 맥락, 지침, 검증, 협업, 진화를 운영하는 Agent Ops 프레임워크다. CLAUDE.md 재구성, worktree 환경 연결, Generator-Evaluator 분리, 멀티 AI 자문을 한 실행 경로로 묶는다.",
  keywords: [
    "Nova",
    "Claude Code",
    "AI agent ops",
    "agent framework",
    "AI Agent Ops",
    "harness engineering",
    "CLAUDE.md",
    "AI 에이전트",
    "verification loop",
    "Generator Evaluator",
    "에이전트 운영",
    "code review",
    "코드 리뷰",
    "verification",
  ],
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Nova — AI Agent Ops Framework for Claude Code",
    description:
      "Claude Code 에이전트 작업을 환경·맥락·지침·검증·협업·진화로 운영하는 Agent Ops 프레임워크.",
    type: "website",
    url: SITE_URL,
    siteName: "Nova",
    locale: "ko_KR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nova — AI Agent Ops Framework for Claude Code",
    description:
      "Claude Code 에이전트 작업을 환경·맥락·지침·검증·협업·진화로 운영하는 Agent Ops 프레임워크.",
  },
  icons: {
    icon: [
      { url: "/nova-landing/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/nova-landing/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  robots: {
    index: true,
    follow: true,
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "Nova",
              description:
                "Nova는 Claude Code에서 AI 에이전트의 환경, 맥락, 지침, 검증, 협업, 진화를 운영하는 Agent Ops 프레임워크다.",
              inLanguage: "ko",
              applicationCategory: "DeveloperApplication",
              operatingSystem: "Cross-platform",
              url: SITE_URL,
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
            }),
          }}
        />
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
