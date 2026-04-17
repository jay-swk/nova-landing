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
    "Nova is a Claude Code plugin that makes AI agents operate reliably. Five pillars — environment, context, quality, collaboration, evolution — with a Quality Gate at the core: Generator-Evaluator separation, independent evaluation, design-implementation gap detection.",
  keywords: [
    "Nova",
    "Claude Code",
    "AI agent ops",
    "agent framework",
    "Quality Gate",
    "code review",
    "verification",
  ],
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Nova — AI Agent Ops Framework for Claude Code",
    description:
      "에이전트가 안정적으로 일하도록 만드는 Agent Ops 프레임워크. 환경·맥락·품질·협업·진화 5기둥, 품질 게이트는 핵심 기둥.",
    type: "website",
    url: SITE_URL,
    siteName: "Nova",
    locale: "ko_KR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nova — AI Agent Ops Framework for Claude Code",
    description:
      "에이전트가 안정적으로 일하도록 만드는 Agent Ops 프레임워크. 환경·맥락·품질·협업·진화 5기둥, 품질 게이트는 핵심 기둥.",
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
                "A Claude Code plugin providing an AI Agent Ops framework (environment, context, quality, collaboration, evolution) with a Quality Gate at its core.",
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
