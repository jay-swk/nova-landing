"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import CodeBlock from "@/components/ui/CodeBlock";
import Button from "@/components/ui/Button";

const agents = [
  {
    role: "Coder",
    desc: "코드 구현 및 리팩토링",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    role: "Reviewer",
    desc: "코드 리뷰 및 품질 검증",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
  {
    role: "QA Engineer",
    desc: "테스트 전략 및 버그 탐지",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M9 11l3 3L22 4" />
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
      </svg>
    ),
  },
  {
    role: "Marketer",
    desc: "콘텐츠 작성 및 마케팅",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    role: "Designer",
    desc: "UI/UX 설계 및 디자인",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="13.5" cy="6.5" r="2.5" />
        <path d="M17.5 10.5a2.5 2.5 0 1 0 0 5" />
        <path d="M8.5 13.5a2.5 2.5 0 1 0 0-5" />
        <circle cx="13.5" cy="17.5" r="2.5" />
        <path d="M6 6.5a2.5 2.5 0 1 0 5 0" />
      </svg>
    ),
  },
];

const highlights = [
  {
    tag: "Kanban",
    title: "Kanban 보드",
    body: "드래그앤드롭으로 태스크를 관리하고, AI 에이전트에게 실시간 할당한다. 진행 상황을 한눈에 파악.",
    detail: ["태스크 생성 및 할당", "에이전트별 진행 추적", "우선순위 자동 정렬"],
    color: "#2563eb",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="3" width="7" height="9" rx="1" />
        <rect x="14" y="3" width="7" height="5" rx="1" />
        <rect x="14" y="12" width="7" height="9" rx="1" />
        <rect x="3" y="16" width="7" height="5" rx="1" />
      </svg>
    ),
  },
  {
    tag: "Goal",
    title: "Goal 분해",
    body: "자연어로 목표를 입력하면 실행 가능한 태스크로 자동 분할한다. 복잡한 프로젝트도 한 줄로 시작.",
    detail: ["자연어 → 태스크 자동 분할", "의존성 그래프 생성", "예상 소요시간 추정"],
    color: "#a855f7",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v8M8 12h8" />
      </svg>
    ),
  },
  {
    tag: "GitHub",
    title: "GitHub 연동",
    body: "레포 클론부터 브랜치 전략, PR 생성까지 GitHub 워크플로를 에이전트가 직접 수행한다.",
    detail: ["레포 클론 및 브랜치 관리", "자동 PR 생성 및 리뷰", "이슈 트래킹 연동"],
    color: "#22c55e",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
      </svg>
    ),
  },
  {
    tag: "Quality",
    title: "Quality Gate 통합",
    body: "Nova의 Generator-Evaluator 패턴을 내장. 5차원 검증으로 에이전트 산출물의 품질을 자동 보장한다.",
    detail: ["Generator-Evaluator 분리", "5차원 품질 검증", "커밋 전 하드 게이트"],
    color: "#ef4444",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
];

const comparisonRows = [
  { feature: "Quality Gate", orbit: "Nova 5차원 검증 내장", other: "없음" },
  { feature: "Setup", orbit: "npx nova-orbit", other: "Docker + 수동 설정" },
  { feature: "Agent Runtime", orbit: "Claude Code 네이티브", other: "자체 런타임" },
  { feature: "UX", orbit: "Kanban + 자연어 Goal", other: "채팅 기반" },
  { feature: "Target", orbit: "Solo Founder / 소규모 팀", other: "엔터프라이즈" },
  { feature: "Cost", orbit: "오픈소스 (무료)", other: "유료 SaaS" },
];

const SCREENSHOT_URL =
  "https://raw.githubusercontent.com/TeamSPWK/nova-orbit/main/docs/screenshots/dark-overview.png";

export default function OrbitSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [imgError, setImgError] = useState(false);

  return (
    <section id="orbit" className="py-24 px-4 sm:px-6 bg-[#0d0d15]">
      <div className="max-w-6xl mx-auto">
        {/* Hero Block */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#2563eb]/30 bg-[#2563eb]/5 text-xs text-[#60a5fa] font-mono mb-4">
            Nova Orbit
          </div>
          <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-bold text-[#f0f0ff] mb-4">
            AI 팀 오케스트레이션
          </h2>
          <p className="text-[#8888aa] max-w-2xl mx-auto text-lg text-balance mb-8">
            혼자서도 팀처럼 — Solo Founder를 위한 AI 에이전트 팀
          </p>

          <div className="max-w-md mx-auto mb-6">
            <CodeBlock code="npx nova-orbit" language="bash" />
          </div>

          <Button
            href="https://github.com/TeamSPWK/nova-orbit"
            variant="secondary"
            size="md"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
            </svg>
            GitHub에서 보기
          </Button>
        </motion.div>

        {/* Agent Role Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-20"
        >
          <h3 className="text-[#f0f0ff] font-semibold text-lg text-center mb-8">
            5개 AI 에이전트 역할
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {agents.map((agent, i) => (
              <motion.div
                key={agent.role}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.12 }}
                className="rounded-2xl border border-[#2a2a3a] bg-[#111118] p-5 text-center hover:border-[#3a3a5a] transition-colors"
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 bg-[#2563eb]/10 text-[#60a5fa]">
                  {agent.icon}
                </div>
                <div className="text-[#f0f0ff] font-semibold text-sm mb-1">
                  {agent.role}
                </div>
                <div className="text-[#8888aa] text-xs">{agent.desc}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Feature Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-20"
        >
          <h3 className="text-[#f0f0ff] font-semibold text-lg text-center mb-8">
            핵심 기능
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {highlights.map((item, i) => (
              <motion.div
                key={item.tag}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 + i * 0.12 }}
                className="group relative rounded-2xl border border-[#2a2a3a] bg-[#111118] p-7 overflow-hidden transition-all hover:border-[#3a3a5a] hover:-translate-y-1"
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                  style={{
                    background: `radial-gradient(ellipse at top left, ${item.color}08, transparent 60%)`,
                  }}
                />
                <div className="flex items-start gap-4 mb-5">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: `${item.color}15`, color: item.color }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <div
                      className="inline-flex px-2 py-0.5 rounded text-xs font-mono mb-1.5"
                      style={{ background: `${item.color}15`, color: item.color }}
                    >
                      {item.tag}
                    </div>
                    <h4 className="text-[#f0f0ff] font-semibold text-xl">
                      {item.title}
                    </h4>
                  </div>
                </div>
                <p className="text-[#8888aa] text-sm leading-relaxed mb-5">
                  {item.body}
                </p>
                <ul className="space-y-1.5">
                  {item.detail.map((d, j) => (
                    <li
                      key={j}
                      className="flex items-center gap-2 text-xs text-[#8888aa] font-mono"
                    >
                      <span style={{ color: item.color }} className="shrink-0">
                        →
                      </span>
                      {d}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-20"
        >
          <h3 className="text-[#f0f0ff] font-semibold text-lg text-center mb-8">
            vs Paperclip
          </h3>
          <div className="overflow-x-auto rounded-xl border border-[#2a2a3a]">
            <table className="w-full text-sm min-w-[480px]">
              <thead>
                <tr className="border-b border-[#2a2a3a] bg-[#111118]">
                  <th className="text-left text-[#8888aa] font-mono font-normal px-5 py-3">
                    Feature
                  </th>
                  <th className="text-left font-mono font-semibold px-5 py-3 text-[#60a5fa]">
                    Nova Orbit
                  </th>
                  <th className="text-left text-[#8888aa] font-mono font-normal px-5 py-3">
                    Paperclip
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => (
                  <tr
                    key={row.feature}
                    className={`border-b border-[#2a2a3a] last:border-b-0 ${
                      i % 2 === 0 ? "bg-[#0d0d15]" : "bg-[#111118]/50"
                    }`}
                  >
                    <td className="px-5 py-3 text-[#8888aa] font-mono">
                      {row.feature}
                    </td>
                    <td className="px-5 py-3 text-[#60a5fa] font-medium">
                      {row.orbit}
                    </td>
                    <td className="px-5 py-3 text-[#8888aa]">{row.other}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Dashboard Preview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-center"
        >
          <h3 className="text-[#f0f0ff] font-semibold text-lg mb-6">
            대시보드 프리뷰
          </h3>
          <div className="rounded-xl border border-[#2a2a3a] overflow-hidden shadow-2xl shadow-black/40 max-w-4xl mx-auto">
            {imgError ? (
              <div className="bg-[#111118] px-8 py-20 text-center">
                <div className="text-[#8888aa] text-sm font-mono mb-2">
                  Nova Orbit Dashboard
                </div>
                <p className="text-[#8080b0] text-xs">
                  스크린샷을 불러올 수 없습니다. GitHub에서 직접 확인하세요.
                </p>
              </div>
            ) : (
              <img
                src={SCREENSHOT_URL}
                alt="Nova Orbit 대시보드 프리뷰"
                className="w-full h-auto block"
                loading="lazy"
                onError={() => setImgError(true)}
              />
            )}
          </div>
          <p className="text-[#8080b0] text-xs mt-3">
            Kanban 보드에서 에이전트 태스크를 실시간으로 관리할 수 있습니다.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
