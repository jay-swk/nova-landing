"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";

interface EvaluationStats {
  commands: number;
  skills: number;
  agents: number;
  rules: number;
  mcpTools?: number;
}

const theses = [
  {
    label: "Category",
    title: "AI coding output은 이미 풍부하다",
    body: "다음 병목은 더 많은 코드를 만드는 능력이 아니라, 에이전트가 어떤 환경·맥락·권한·검증 루프 안에서 일하는지 운영하는 능력이다.",
    signal: "Agent Ops",
    color: "#2563eb",
  },
  {
    label: "Adoption",
    title: "신규와 기존 프로젝트를 모두 흡수해야 한다",
    body: "빈 레포에는 에이전트 지침의 골격을 만들고, 오래된 레포에는 현재 관례·배포·시크릿·인프라를 읽어 가장 작은 지침 표면으로 재구성한다.",
    signal: "/nova:claude-md",
    color: "#22c55e",
  },
  {
    label: "Control",
    title: "하네스 레이어에 붙어야 반복성이 생긴다",
    body: "Nova는 문서 하나가 아니라 훅, 커맨드, 스킬, MCP, 상태 파일을 함께 묶는다. 에이전트가 매번 기억해주길 바라는 대신 실행 경로에 규칙을 둔다.",
    signal: "Harness-native",
    color: "#a855f7",
  },
  {
    label: "Proof",
    title: "검증은 기능이 아니라 운영 습관이다",
    body: "Generator-Evaluator 분리, clean-clone 확인, 릴리스 전 테스트를 통해 변경을 통과시키는 구조를 만든다. 중요한 것은 멋진 데모보다 반복 가능한 통제다.",
    signal: "Repeatable gate",
    color: "#eab308",
  },
];

const evaluatorChecks = [
  ["Positioning", "Nova가 Quality Gate를 넘어 Agent Ops 카테고리로 설명되는가"],
  ["Instruction Surface", "CLAUDE.md·AGENTS.md·NOVA-STATE.md가 역할별로 분리되는가"],
  ["Runtime Hook", "세션 시작, worktree, 검증, 커밋 전 행동이 실행 경로에 연결되는가"],
  ["Evidence", "테스트·빌드·clean clone·Known Gaps가 기록으로 남는가"],
];

export default function EvaluationSection({ stats }: { stats?: EvaluationStats }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const s = stats ?? { commands: 16, skills: 13, agents: 6, rules: 10, mcpTools: 7 };

  return (
    <section id="evaluation" className="py-24 px-4 sm:px-6 bg-[#0d0d15]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-10 items-end mb-14"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#22c55e]/30 bg-[#22c55e]/5 text-xs text-[#22c55e] font-mono mb-4">
              Adoption Standard
            </div>
            <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-bold text-[#f0f0ff] mb-4 leading-tight">
              도입 전에 봐야 할 것은 데모가 아니라 운영 반복성
            </h2>
            <p className="text-[#8888aa] text-lg leading-relaxed">
              Nova의 핵심 질문은 “AI가 코드를 잘 짜는가”가 아니다. 같은 프로젝트에서 여러 에이전트가
              오래 일해도, 지침과 검증과 맥락이 흩어지지 않는가다.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {[
              [s.commands, "commands"],
              [s.skills, "skills"],
              [s.agents, "agents"],
              [s.rules, "rules"],
              [s.mcpTools ?? 7, "MCP tools"],
            ].map(([value, label]) => (
              <div
                key={label}
                className="rounded-xl border border-[#2a2a3a] bg-[#111118] px-4 py-5 text-center"
              >
                <div className="text-2xl font-bold gradient-text">{value}</div>
                <div className="text-[11px] text-[#8080b0] font-mono mt-1">{label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
          {theses.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative rounded-2xl border border-[#2a2a3a] bg-[#111118] p-6 overflow-hidden"
            >
              <div
                className="absolute inset-0 opacity-70 pointer-events-none"
                style={{
                  background: `linear-gradient(135deg, ${item.color}12, transparent 45%)`,
                }}
              />
              <div className="relative">
                <div className="flex items-center justify-between gap-4 mb-4">
                  <span
                    className="inline-flex px-2 py-0.5 rounded text-xs font-mono"
                    style={{ background: `${item.color}16`, color: item.color }}
                  >
                    {item.label}
                  </span>
                  <span className="text-xs text-[#8080b0] font-mono">{item.signal}</span>
                </div>
                <h3 className="text-[#f0f0ff] text-xl font-semibold mb-3 leading-snug">
                  {item.title}
                </h3>
                <p className="text-[#8888aa] text-sm leading-relaxed">{item.body}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="rounded-2xl border border-[#2a2a3a] bg-[#0a0a0f] overflow-hidden"
        >
          <div className="px-5 py-4 border-b border-[#2a2a3a] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <h3 className="text-[#f0f0ff] font-semibold">Operational Checklist</h3>
            <span className="text-xs text-[#8080b0] font-mono">
              what should stay true after every release
            </span>
          </div>
          <div className="divide-y divide-[#2a2a3a]">
            {evaluatorChecks.map(([label, body]) => (
              <div
                key={label}
                className="grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-2 px-5 py-4"
              >
                <div className="text-sm font-mono text-[#a855f7]">{label}</div>
                <div className="text-sm text-[#f0f0ff]">{body}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
