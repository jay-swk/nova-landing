"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";

const steps = [
  {
    id: "generator",
    label: "Generator",
    sublabel: "AI가 코드를 구현",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" />
      </svg>
    ),
    color: "#2563eb",
    bgColor: "rgba(37,99,235,0.15)",
    desc: "Claude Code가 기능을 구현한다",
  },
  {
    id: "nova",
    label: "Nova",
    sublabel: "독립 Evaluator 루프",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M9 12l2 2 4-4M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z" />
      </svg>
    ),
    color: "#a855f7",
    bgColor: "rgba(168,85,247,0.15)",
    desc: "독립 서브에이전트가 적대적 검증",
    highlight: true,
  },
  {
    id: "done",
    label: "Done / Fix",
    sublabel: "PASS 또는 수정 요청",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14M22 4L12 14.01l-3-3" />
      </svg>
    ),
    color: "#22c55e",
    bgColor: "rgba(34,197,94,0.15)",
    desc: "PASS면 완료, 문제면 즉시 보고",
  },
];

const checkDimensions = [
  { label: "기능", desc: "요구사항과 실제 동작 일치 여부", color: "#7c3aed" },
  { label: "데이터 관통", desc: "입력→저장→표시 전 경로 완전성", color: "#2563eb" },
  { label: "설계 정합성", desc: "기존 코드/아키텍처 일관성", color: "#a855f7" },
  { label: "에러 핸들링", desc: "에러 핸들링, 엣지 케이스, 타입 안전성", color: "#22c55e" },
  { label: "경계값", desc: "0, 음수, 빈 값에서 크래시 없음", color: "#eab308" },
];

export default function HowItWorksSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="how-it-works" className="py-24 px-4 sm:px-6 bg-[#0d0d15]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#7c3aed]/30 bg-[#7c3aed]/5 text-xs text-[#a855f7] font-mono mb-4">
            How It Works
          </div>
          <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-bold text-[#f0f0ff] mb-4">
            가장 강한 실행 루프: Generator → Evaluator
          </h2>
          <p className="text-[#8888aa] max-w-2xl mx-auto text-lg">
            Nova 전체는 Agent Ops 프레임워크이고, 그 안의 커밋 전 루프는 명확하다.
            <br />
            코드를 만든 에이전트와 검증하는 에이전트를 분리한다.
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-16">
          {steps.map((step, i) => (
            <div key={step.id} className="flex items-center gap-4 w-full md:w-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: i * 0.2 }}
                className={`relative flex-1 md:w-56 rounded-2xl border p-6 text-center ${
                  step.highlight
                    ? "border-[#7c3aed]/60 bg-[#1a1a24] shadow-lg shadow-purple-900/20"
                    : "border-[#2a2a3a] bg-[#111118]"
                }`}
              >
                {step.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[#7c3aed] text-white text-xs font-mono font-semibold">
                    Verification Loop
                  </div>
                )}
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
                  style={{ background: step.bgColor, color: step.color }}
                >
                  {step.icon}
                </div>
                <div className="font-bold text-[#f0f0ff] text-lg mb-1">{step.label}</div>
                <div className="text-xs text-[#8888aa] font-mono">{step.sublabel}</div>
                <div className="text-xs text-[#8080b0] mt-2">{step.desc}</div>
              </motion.div>

              {i < steps.length - 1 && (
                <motion.div
                  initial={{ opacity: 0, scaleX: 0 }}
                  animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
                  transition={{ duration: 0.4, delay: i * 0.2 + 0.3 }}
                  aria-hidden="true"
                  className="hidden md:flex flex-col items-center gap-1 shrink-0"
                >
                  <svg
                    width="32"
                    height="16"
                    viewBox="0 0 32 16"
                    fill="none"
                    className="text-[#3a3a5a]"
                  >
                    <path
                      d="M0 8h28M22 2l8 6-8 6"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </motion.div>
              )}
            </div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="rounded-2xl border border-[#2a2a3a] bg-[#111118] p-8"
        >
          <h3 className="text-[#f0f0ff] font-semibold text-lg mb-2 text-center">
            Evaluator의 5차원 검증
          </h3>
          <p className="text-[#8888aa] text-sm text-center mb-8">
            &ldquo;통과시키지 마라, 문제를 찾아라&rdquo; — 적대적 자세로 5가지 기준을 독립 검증
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
            {checkDimensions.map((dim, i) => (
              <motion.div
                key={dim.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.7 + i * 0.1 }}
                className="text-center"
              >
                <div
                  className="w-10 h-10 rounded-xl mx-auto mb-3 flex items-center justify-center font-bold text-sm font-mono"
                  style={{ background: `${dim.color}20`, color: dim.color }}
                >
                  {i + 1}
                </div>
                <div className="text-[#f0f0ff] text-sm font-medium mb-1">{dim.label}</div>
                <div className="text-[#8080b0] text-xs">{dim.desc}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
