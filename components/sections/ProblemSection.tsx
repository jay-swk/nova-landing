"use client";

import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";

const problems = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 9v4M12 17h.01M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      </svg>
    ),
    tag: "운영 공백",
    title: "코드는 늘었지만 통제면은 비어 있다",
    body: "AI가 빠르게 구현해도, 어떤 규칙으로 일하고 어떤 상태를 기억하며 어디까지 검증했는지 남지 않으면 프로젝트는 더 빨리 복잡해진다.",
    accent: "#ef4444",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v4M12 16h.01" />
      </svg>
    ),
    tag: "지침 드리프트",
    title: "CLAUDE.md 하나에 모든 것을 넣으면 다시 흩어진다",
    body: "프로젝트 개요, 배포 주의, 인프라 참조, 시크릿 관리, 작업 규칙이 한 파일에 쌓이면 에이전트도 우선순위를 잃는다. 중요한 지침 표면을 작게 유지해야 한다.",
    accent: "#eab308",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
      </svg>
    ),
    tag: "검증 착시",
    title: "자기가 만든 코드를 자기가 통과시킨다",
    body: "같은 에이전트가 구현과 리뷰를 모두 맡으면 확증 편향이 생긴다. 설계-구현 갭, 하드코딩된 시크릿, 경계값 누락은 독립 관점에서 봐야 드러난다.",
    accent: "#7c3aed",
  },
];

export default function ProblemSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="problem" className="py-24 px-4 sm:px-6 bg-[#0a0a0f] border-t border-[#2a2a3a]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#ef4444]/30 bg-[#ef4444]/5 text-xs text-[#ef4444] font-mono mb-4">
            The Real Problem
          </div>
          <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-bold text-[#f0f0ff] mb-4">
            AI 코딩의 진짜 병목은 운영이다
          </h2>
          <p className="text-[#8888aa] max-w-2xl mx-auto text-lg">
            생성 속도가 빨라질수록 지침, 맥락, 검증, 배포 주의가 흩어지는 비용이 커진다.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {problems.map((problem, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="group relative rounded-2xl border border-[#2a2a3a] bg-[#111118] p-6 hover:border-[#3a3a5a] transition-all hover:-translate-y-1"
            >
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"
                style={{
                  background: `radial-gradient(ellipse at top left, ${problem.accent}10, transparent 60%)`,
                }}
              />
              <div
                className="relative w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                style={{ background: `${problem.accent}15`, color: problem.accent }}
              >
                {problem.icon}
              </div>
              <div
                className="inline-flex px-2 py-0.5 rounded text-xs font-mono mb-3"
                style={{ background: `${problem.accent}15`, color: problem.accent }}
              >
                {problem.tag}
              </div>
              <h3 className="text-[#f0f0ff] font-semibold text-lg mb-3 leading-snug">
                {problem.title}
              </h3>
              <p className="text-[#8888aa] text-sm leading-relaxed">{problem.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
