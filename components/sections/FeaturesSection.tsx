"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";

const features = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-1.14M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-1.14" />
      </svg>
    ),
    tag: "Auto",
    title: "자동 복잡도 판단",
    body: "작업 요청 즉시 파일 수, 도메인, 위험도를 종합해 Simple/Medium/Complex를 자동 판단한다. 인증·DB·결제 도메인은 파일 수와 무관하게 한 단계 상향.",
    detail: ["1~2파일 → Evaluator Lite", "3~7파일 → Plan → Evaluator Standard", "8+파일 → Sprint split → Evaluator Full"],
    color: "#2563eb",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
      </svg>
    ),
    tag: "Core",
    title: "Generator-Evaluator 분리",
    body: "구현한 에이전트와 검증하는 에이전트는 항상 다른 서브에이전트다. 커밋 전 하드 게이트: tsc/lint 통과 → Evaluator PASS → 커밋 허용.",
    detail: ["독립 서브에이전트 검증", "커밋 전 강제 게이트", "--emergency 예외 모드"],
    color: "#a855f7",
    highlight: true,
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
    tag: "Verify",
    title: "5차원 검증 기준",
    body: "기능·데이터 관통·설계 정합성·에러 핸들링·경계값의 5가지 차원으로 검증한다. '테스트 통과'와 '경계값 안전'은 별개로 확인.",
    detail: ["기능 / 데이터 관통", "설계 정합성 / 에러 핸들링", "경계값 (0, 음수, 빈 값)"],
    color: "#22c55e",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    tag: "Safety",
    title: "Hard-Block 자동 분류",
    body: "Auto-Resolve·Soft-Block·Hard-Block 3단계로 자동 분류. 런타임 크래시, 보안 취약점, 사용자 오판단 유발은 Hard-Block으로 즉시 중단.",
    detail: ["보안 취약점 → Hard-Block", "데이터 손상 → Hard-Block", "사용자 오판단 → Hard-Block"],
    color: "#ef4444",
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
            Core Features
          </div>
          <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-bold text-[#f0f0ff] mb-4">
            4개의 핵심 기능
          </h2>
          <p className="text-[#8888aa] max-w-xl mx-auto text-lg">
            설치 즉시 모든 대화에 자동 적용. 커맨드 없이도 동작한다.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className={`group relative rounded-2xl border p-7 overflow-hidden transition-all hover:-translate-y-1 ${
                feature.highlight
                  ? "border-[#7c3aed]/50 bg-[#111118] shadow-lg shadow-purple-900/10"
                  : "border-[#2a2a3a] bg-[#111118] hover:border-[#3a3a5a]"
              }`}
            >
              {feature.highlight && (
                <div className="absolute top-0 right-0 px-3 py-1 bg-gradient-to-r from-[#7c3aed] to-[#6d28d9] text-white text-xs font-mono rounded-bl-xl rounded-tr-xl">
                  핵심
                </div>
              )}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                style={{
                  background: `radial-gradient(ellipse at top left, ${feature.color}08, transparent 60%)`,
                }}
              />

              <div className="flex items-start gap-4 mb-5">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: `${feature.color}15`, color: feature.color }}
                >
                  {feature.icon}
                </div>
                <div>
                  <div
                    className="inline-flex px-2 py-0.5 rounded text-xs font-mono mb-1.5"
                    style={{ background: `${feature.color}15`, color: feature.color }}
                  >
                    {feature.tag}
                  </div>
                  <h3 className="text-[#f0f0ff] font-semibold text-xl">{feature.title}</h3>
                </div>
              </div>

              <p className="text-[#8888aa] text-sm leading-relaxed mb-5">{feature.body}</p>

              <ul className="space-y-1.5">
                {feature.detail.map((d, j) => (
                  <li key={j} className="flex items-center gap-2 text-xs text-[#8888aa] font-mono">
                    <span style={{ color: feature.color }} className="shrink-0">→</span>
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
