"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";

const pillars = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <path d="M14 17.5h7M17.5 14v7" />
      </svg>
    ),
    tag: "Environment",
    title: "환경 — 에이전트 작업 공간",
    body: "Worktree 격리, 시크릿 공유, 환경변수 연결까지 — 병렬 에이전트가 서로를 깨뜨리지 않고 일할 수 있는 운영 환경을 제공한다.",
    detail: ["Worktree 자동 셋업", "`.env`·`.secret/` 공유", "SessionStart 훅 자동 주입"],
    color: "#2563eb",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        <path d="M8 9h8M8 13h5" />
      </svg>
    ),
    tag: "Context",
    title: "맥락 — 세션 연속성",
    body: "NOVA-STATE.md로 진행 상태·블로커·결정 로그를 세션 간에 이어붙인다. 어제 끝낸 자리에서 오늘 그대로 시작한다.",
    detail: ["자동 갱신 체크포인트", "Known Gaps / Risks 추적", "memory 시스템과 연동"],
    color: "#0ea5e9",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
      </svg>
    ),
    tag: "Verification · Core",
    title: "검증 — Generator-Evaluator 분리",
    body: "구현한 에이전트와 검증하는 에이전트를 다른 실행 주체로 분리한다. 커밋 전에는 tsc/lint 통과, Evaluator PASS, Known Gaps 기록까지 한 루프로 묶는다.",
    detail: [
      "독립 서브에이전트 검증",
      "5차원 (기능·데이터·설계·에러·경계값)",
      "Hard-Block 자동 분류",
      "`--emergency` 예외 모드",
    ],
    color: "#a855f7",
    highlight: true,
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="9" cy="7" r="4" />
        <path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
        <circle cx="17" cy="5" r="2" />
        <path d="M21 21v-1a3 3 0 0 0-3-3h-1" />
      </svg>
    ),
    tag: "Collaboration",
    title: "협업 — 오케스트레이션 & 자문",
    body: "설계→구현→검증 전체 사이클을 한 명령으로 조율하고, 결정이 갈리는 지점에서는 Claude·GPT·Gemini를 동시에 불러 교차 확인한다.",
    detail: ["/nova:auto — 풀 사이클", "/nova:run — 구현→검증", "/nova:ask — 멀티 AI 자문"],
    color: "#22c55e",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2a10 10 0 1 0 10 10" />
        <path d="M22 2 12 12" />
        <path d="M22 2v6h-6" />
      </svg>
    ),
    tag: "Evolution",
    title: "진화 — 자기 진단 & 업그레이드",
    body: "코드베이스를 스캔해 다음 행동을 추천하고, 기술 동향을 반영해 Nova 자신을 안전 범위 안에서 업그레이드한다.",
    detail: ["/nova:scan — 온보딩 분석", "/nova:next — 다음 행동 추천", "/nova:evolve — 자율 진화"],
    color: "#eab308",
  },
];

export default function FeaturesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="features" className="py-24 px-4 sm:px-6 bg-[#0a0a0f]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#7c3aed]/30 bg-[#7c3aed]/5 text-xs text-[#a855f7] font-mono mb-4">
            Five Pillars
          </div>
          <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-bold text-[#f0f0ff] mb-4">
            AI Agent Ops 5기둥
          </h2>
          <p className="text-[#8888aa] max-w-2xl mx-auto text-lg">
            Nova는 품질 게이트에서 출발했지만, 이제 에이전트가 안정적으로 일하기 위한
            환경·맥락·검증·협업·진화 전체를 다룬다. 검증 기둥은 여전히 가장 강한 증거다.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pillars.map((pillar, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`group relative rounded-2xl border p-7 overflow-hidden transition-all hover:-translate-y-1 ${
                pillar.highlight
                  ? "md:col-span-2 border-[#7c3aed]/50 bg-[#111118] shadow-lg shadow-purple-900/10"
                  : "border-[#2a2a3a] bg-[#111118] hover:border-[#3a3a5a]"
              }`}
            >
              {pillar.highlight && (
                <div className="absolute top-0 right-0 px-3 py-1 bg-gradient-to-r from-[#7c3aed] to-[#6d28d9] text-white text-xs font-mono rounded-bl-xl rounded-tr-xl">
                  핵심 기둥
                </div>
              )}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                style={{
                  background: `radial-gradient(ellipse at top left, ${pillar.color}08, transparent 60%)`,
                }}
              />

              <div className="flex items-start gap-4 mb-5">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: `${pillar.color}15`, color: pillar.color }}
                >
                  {pillar.icon}
                </div>
                <div>
                  <div
                    className="inline-flex px-2 py-0.5 rounded text-xs font-mono mb-1.5"
                    style={{ background: `${pillar.color}15`, color: pillar.color }}
                  >
                    {pillar.tag}
                  </div>
                  <h3 className="text-[#f0f0ff] font-semibold text-xl">{pillar.title}</h3>
                </div>
              </div>

              <p className="text-[#8888aa] text-sm leading-relaxed mb-5">{pillar.body}</p>

              <ul className={`space-y-1.5 ${pillar.highlight ? "md:grid md:grid-cols-2 md:gap-x-6 md:space-y-0 md:gap-y-1.5" : ""}`}>
                {pillar.detail.map((d, j) => (
                  <li key={j} className="flex items-center gap-2 text-xs text-[#8888aa] font-mono">
                    <span style={{ color: pillar.color }} className="shrink-0">→</span>
                    {d}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
