"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";

const agents = [
  {
    role: "Architect",
    desc: "시스템 설계와 모듈 간 결합도 분석",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    color: "#7c3aed",
  },
  {
    role: "Frontend Dev",
    desc: "UI 구현과 상태 관리, 컴포넌트 설계",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    color: "#2563eb",
  },
  {
    role: "QA Engineer",
    desc: "테스트 전략 수립과 엣지 케이스 탐지",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M9 11l3 3L22 4" />
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
      </svg>
    ),
    color: "#22c55e",
  },
  {
    role: "Security",
    desc: "취약점 점검과 OWASP 기반 보안 감사",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    color: "#ef4444",
  },
  {
    role: "DevOps",
    desc: "CI/CD 파이프라인과 배포 전략 구성",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    ),
    color: "#eab308",
  },
];

const comparisonRows = [
  { label: "에이전트 역할 분리", orbit: true, single: false, manual: false },
  { label: "독립 검증 (Evaluator)", orbit: true, single: false, manual: true },
  { label: "자동 복잡도 판단", orbit: true, single: false, manual: false },
  { label: "병렬 작업 실행", orbit: true, single: false, manual: false },
  { label: "스프린트 분할·추적", orbit: true, single: false, manual: true },
  { label: "설계-구현 갭 탐지", orbit: true, single: false, manual: true },
];

function CheckIcon({ checked }: { checked: boolean }) {
  if (checked) {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" aria-hidden="true">
        <path d="M20 6L9 17l-5-5" />
      </svg>
    );
  }
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4a4a5a" strokeWidth="2" aria-hidden="true">
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  );
}

export default function OrbitSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="orbit" aria-label="Nova Orbit 멀티 에이전트 오케스트레이션" className="py-24 px-4 sm:px-6 bg-[#0d0d15]">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#7c3aed]/30 bg-[#7c3aed]/5 text-xs text-[#a855f7] font-mono mb-4">
            Orbit
          </div>
          <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-bold text-[#f0f0ff] mb-4">
            멀티 에이전트 오케스트레이션
          </h2>
          <p className="text-[#8888aa] max-w-2xl mx-auto text-lg text-balance">
            자연어 한 줄로 설계→구현→검증 전체 사이클을 실행한다.
            역할별 전문 에이전트가 병렬로 작업하고, 독립 Evaluator가 품질을 보장한다.
          </p>
        </motion.div>

        {/* Agent Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mb-16"
        >
          <h3 className="text-[#f0f0ff] font-semibold text-lg mb-6 text-center">
            역할별 전문 에이전트
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
            {agents.map((agent, i) => (
              <motion.div
                key={agent.role}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.25 + i * 0.08 }}
                className="group relative rounded-xl border border-[#2a2a3a] bg-[#111118] p-4 text-center hover:border-[#3a3a5a] transition-colors"
              >
                <div
                  className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                  style={{
                    background: `radial-gradient(ellipse at center, ${agent.color}0a, transparent 70%)`,
                  }}
                />
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3"
                  style={{ background: `${agent.color}15`, color: agent.color }}
                >
                  {agent.icon}
                </div>
                <div className="text-[#f0f0ff] text-sm font-semibold mb-1">{agent.role}</div>
                <p className="text-[#8888aa] text-xs leading-relaxed">{agent.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-16"
        >
          <h3 className="text-[#f0f0ff] font-semibold text-lg mb-6 text-center">
            왜 Orbit인가?
          </h3>
          <div className="rounded-2xl border border-[#2a2a3a] bg-[#111118] overflow-x-auto">
            {/* Table Header */}
            <div className="grid grid-cols-[minmax(140px,1fr)_repeat(3,72px)] sm:grid-cols-[1fr_repeat(3,minmax(100px,1fr))] min-w-[360px] border-b border-[#2a2a3a]">
              <div className="px-4 sm:px-6 py-3" />
              <div className="px-2 sm:px-4 py-3 text-center border-l border-[#2a2a3a] bg-[#7c3aed]/8">
                <span className="text-xs sm:text-sm font-semibold text-[#a855f7] font-mono">Orbit</span>
              </div>
              <div className="px-2 sm:px-4 py-3 text-center border-l border-[#2a2a3a]">
                <span className="text-xs sm:text-sm text-[#8888aa] font-mono">단일 AI</span>
              </div>
              <div className="px-2 sm:px-4 py-3 text-center border-l border-[#2a2a3a]">
                <span className="text-xs sm:text-sm text-[#8888aa] font-mono">수동</span>
              </div>
            </div>

            {/* Table Body */}
            {comparisonRows.map((row, i) => (
              <motion.div
                key={row.label}
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.3, delay: 0.4 + i * 0.05 }}
                className={`grid grid-cols-[minmax(140px,1fr)_repeat(3,72px)] sm:grid-cols-[1fr_repeat(3,minmax(100px,1fr))] min-w-[360px] ${
                  i < comparisonRows.length - 1 ? "border-b border-[#2a2a3a]" : ""
                }`}
              >
                <div className="px-4 sm:px-6 py-3 text-xs sm:text-sm text-[#c0c0d0]">{row.label}</div>
                <div className="px-2 sm:px-4 py-3 flex justify-center items-center border-l border-[#2a2a3a] bg-[#7c3aed]/5">
                  <CheckIcon checked={row.orbit} />
                  <span className="sr-only">{row.orbit ? "지원" : "미지원"}</span>
                </div>
                <div className="px-2 sm:px-4 py-3 flex justify-center items-center border-l border-[#2a2a3a]">
                  <CheckIcon checked={row.single} />
                  <span className="sr-only">{row.single ? "지원" : "미지원"}</span>
                </div>
                <div className="px-2 sm:px-4 py-3 flex justify-center items-center border-l border-[#2a2a3a]">
                  <CheckIcon checked={row.manual} />
                  <span className="sr-only">{row.manual ? "지원" : "미지원"}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Dashboard Fallback UI */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="rounded-2xl border border-[#2a2a3a] bg-[#111118] overflow-hidden"
        >
          {/* Window Chrome */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-[#2a2a3a] bg-[#0d0d15]">
            <div className="flex gap-1.5" aria-hidden="true">
              <div className="w-2.5 h-2.5 rounded-full bg-[#ef4444]/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#eab308]/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#22c55e]/60" />
            </div>
            <span className="text-xs text-[#8888aa] font-mono ml-2">nova orchestrate</span>
          </div>

          {/* Dashboard Content */}
          <div className="p-4 sm:p-6 space-y-4" role="img" aria-label="Nova Orbit 대시보드 예시">
            {/* Task Header */}
            <div className="flex items-center gap-3 mb-2">
              <div className="w-2 h-2 rounded-full bg-[#22c55e] motion-safe:animate-pulse" aria-hidden="true" />
              <span className="text-sm text-[#f0f0ff] font-mono">
                &quot;사용자 인증 시스템 구현&quot;
              </span>
              <span className="ml-auto text-xs text-[#8888aa] font-mono hidden sm:inline">
                Sprint 1/2
              </span>
            </div>

            {/* Agent Status Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                { role: "Architect", status: "완료", color: "#22c55e", task: "DB 스키마 + API 설계" },
                { role: "Frontend", status: "진행 중", color: "#2563eb", task: "로그인 UI 구현" },
                { role: "QA", status: "대기", color: "#8888aa", task: "테스트 케이스 준비" },
              ].map((item) => (
                <div key={item.role} className="rounded-lg border border-[#2a2a3a] bg-[#0d0d15] px-4 py-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-[#f0f0ff] font-semibold">{item.role}</span>
                    <span
                      className="text-xs font-mono px-2 py-0.5 rounded"
                      style={{ background: `${item.color}15`, color: item.color }}
                    >
                      {item.status}
                    </span>
                  </div>
                  <p className="text-xs text-[#8888aa]">{item.task}</p>
                </div>
              ))}
            </div>

            {/* Progress Bar */}
            <div className="pt-2">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs text-[#8888aa]">전체 진행률</span>
                <span className="text-xs text-[#a855f7] font-mono">42%</span>
              </div>
              <div className="h-1.5 rounded-full bg-[#2a2a3a] overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-[#7c3aed] to-[#2563eb]"
                  initial={{ width: 0 }}
                  animate={isInView ? { width: "42%" } : {}}
                  transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
                />
              </div>
            </div>

            {/* Evaluator Gate */}
            <div className="flex items-center gap-2 pt-1 border-t border-[#2a2a3a]">
              <div className="w-4 h-4 rounded flex items-center justify-center bg-[#eab308]/15" aria-hidden="true">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#eab308" strokeWidth="2.5">
                  <path d="M12 9v4M12 17h.01" />
                </svg>
              </div>
              <span className="text-xs text-[#8888aa]">
                <span className="text-[#eab308] font-mono">Evaluator</span> — Sprint 1 검증 대기 중
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
