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
    tag: "설계 병목",
    title: "1주차 잘못된 판단이 4주를 날린다",
    body: "AI가 코드를 빠르게 생성해도, 아키텍처 결정 하나가 잘못되면 스노우볼처럼 불어난다. 스택 트레이스가 원인을 가리키지 않을 때 팀 전체가 멈춘다.",
    accent: "#ef4444",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v4M12 16h.01" />
      </svg>
    ),
    tag: "자기 검증의 함정",
    title: '"자기가 쓴 코드를 자기가 리뷰"',
    body: "같은 AI가 코드를 만들고 리뷰한다. 확증 편향. jwt_secret을 하드코딩해놓고 리뷰에서 통과시킨다. 설계에서 명시한 bcrypt 해싱이 구현에 없어도 모른다.",
    accent: "#eab308",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
      </svg>
    ),
    tag: "맥락 소실",
    title: "세션이 끊기면 맥락이 사라진다",
    body: "AI 대화는 세션 단위다. 어제 설계한 결정, 발견한 Known Gaps, 완료한 스프린트 — 새 세션이 열리면 모두 초기화. 같은 실수를 반복하는 이유다.",
    accent: "#7c3aed",
  },
];

export default function ProblemSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="problem" className="py-24 px-4 sm:px-6 bg-[#0a0a0f]">
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
            AI가 만든 코드의 진짜 병목
          </h2>
          <p className="text-[#8888aa] max-w-2xl mx-auto text-lg">
            타이핑 속도가 병목이 아니다. 잘못된 판단의{" "}
            <span className="text-[#f0f0ff]">복리 이자</span>가 병목이다.
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
