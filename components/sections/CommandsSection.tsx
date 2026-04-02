"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "motion/react";

const categories = ["All", "Plan", "Verify", "Automate", "Analyze"];

const commands = [
  {
    cmd: "/nova:next",
    desc: "프로젝트 상태 진단 + 다음 액션 추천",
    when: "세션 시작 시, 방향 모를 때",
    category: "Analyze",
    flags: [],
  },
  {
    cmd: "/nova:plan",
    desc: "CPS Plan 문서 작성",
    when: "새 기능 기획 시",
    category: "Plan",
    flags: ["feature-name"],
  },
  {
    cmd: "/nova:design",
    desc: "CPS Design 문서 작성",
    when: "Plan 이후 기술 설계 시",
    category: "Plan",
    flags: ["feature-name"],
  },
  {
    cmd: "/nova:review",
    desc: "적대적 코드 리뷰",
    when: "코드 품질 점검",
    category: "Verify",
    flags: ["--fast", "--strict", "--fix", "--jury"],
  },
  {
    cmd: "/nova:verify",
    desc: "review + gap 통합 검증",
    when: "구현 완료 후 종합 검증",
    category: "Verify",
    flags: ["--fast", "--strict"],
  },
  {
    cmd: "/nova:gap",
    desc: "설계↔구현 갭 탐지",
    when: "설계와 코드가 맞는지 확인",
    category: "Verify",
    flags: ["--fast", "--strict"],
  },
  {
    cmd: "/nova:xv",
    desc: "멀티 AI 다관점 수집 (Claude+GPT+Gemini)",
    when: "설계 판단, 아키텍처 선택",
    category: "Analyze",
    flags: ["--agent"],
  },
  {
    cmd: "/nova:auto",
    desc: "구현→검증 자율 실행",
    when: "한방에 끝내고 싶을 때",
    category: "Automate",
    flags: ["--verify-only", "--emergency"],
  },
  {
    cmd: "/nova:init",
    desc: "Nova 초기 설정 + 커스텀 에이전트 생성",
    when: "새 프로젝트 시작 시",
    category: "Plan",
    flags: ["project-name"],
  },
  {
    cmd: "/nova:propose",
    desc: "반복 패턴을 규칙으로 제안",
    when: "프로젝트 규칙 진화",
    category: "Plan",
    flags: ["pattern"],
  },
  {
    cmd: "/nova:metrics",
    desc: "Nova 도입 수준 측정",
    when: "도입 수준 점검",
    category: "Analyze",
    flags: [],
  },
  {
    cmd: "/nova:explore",
    desc: "코드베이스 자동 분석, 어디부터 볼지 브리핑",
    when: "새 프로젝트 첫 투입 시",
    category: "Analyze",
    flags: [],
  },
];

const categoryColors: Record<string, string> = {
  Plan: "#2563eb",
  Verify: "#22c55e",
  Automate: "#a855f7",
  Analyze: "#eab308",
};

export default function CommandsSection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const filtered =
    activeCategory === "All"
      ? commands
      : commands.filter((c) => c.category === activeCategory);

  return (
    <section id="commands" className="py-24 px-4 sm:px-6 bg-[#0a0a0f]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#7c3aed]/30 bg-[#7c3aed]/5 text-xs text-[#a855f7] font-mono mb-4">
            12 Commands
          </div>
          <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-bold text-[#f0f0ff] mb-4">
            필요할 때 직접 제어
          </h2>
          <p className="text-[#8888aa] max-w-xl mx-auto">
            자동 적용 규칙 위에 추가 제어가 필요할 때 사용하는 12개 커맨드.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap gap-2 justify-center mb-8"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat
                  ? "bg-[#7c3aed] text-white"
                  : "border border-[#2a2a3a] text-[#8888aa] hover:text-[#f0f0ff] hover:border-[#3a3a5a]"
              }`}
            >
              {cat === "All" ? `All (${commands.length})` : cat}
            </button>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="rounded-2xl border border-[#2a2a3a] bg-[#111118] overflow-hidden"
        >
          <div className="hidden md:grid grid-cols-[auto_1fr_1fr_auto] gap-4 px-5 py-3 bg-[#0d0d15] border-b border-[#2a2a3a] text-xs font-mono text-[#444466] uppercase tracking-wider">
            <div>Command</div>
            <div>Description</div>
            <div>When to use</div>
            <div>Flags</div>
          </div>

          {filtered.map((cmd, i) => (
            <motion.div
              key={cmd.cmd}
              initial={{ opacity: 0, x: -10 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.3, delay: 0.4 + i * 0.04 }}
              className="grid grid-cols-1 md:grid-cols-[auto_1fr_1fr_auto] gap-2 md:gap-4 px-5 py-4 border-b border-[#2a2a3a] last:border-b-0 hover:bg-[#1a1a24] transition-colors group"
            >
              <div className="flex items-start gap-2">
                <div
                  className="w-2 h-2 rounded-full mt-1.5 shrink-0"
                  style={{ background: categoryColors[cmd.category] ?? "#7c3aed" }}
                />
                <code className="text-[#a855f7] font-mono text-sm whitespace-nowrap font-semibold">
                  {cmd.cmd}
                </code>
              </div>
              <div className="text-sm text-[#f0f0ff] md:pl-0 pl-4">{cmd.desc}</div>
              <div className="text-sm text-[#8888aa] md:pl-0 pl-4">{cmd.when}</div>
              <div className="flex flex-wrap gap-1 md:pl-0 pl-4">
                {cmd.flags.map((flag) => (
                  <span
                    key={flag}
                    className="px-1.5 py-0.5 rounded text-xs font-mono bg-[#1a1a24] text-[#8888aa] border border-[#2a2a3a] group-hover:border-[#3a3a5a] transition-colors"
                  >
                    {flag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
