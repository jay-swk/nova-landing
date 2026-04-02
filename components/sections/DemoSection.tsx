"use client";

import { useState, useEffect } from "react";
import { useRef } from "react";
import { motion, useInView } from "motion/react";
import TerminalWindow from "@/components/ui/TerminalWindow";

type TerminalLineType = "command" | "output" | "pass" | "fail" | "warn" | "comment" | "blank";

interface TerminalLine {
  type: TerminalLineType;
  content: string;
  delay?: number;
}

const demos: {
  label: string;
  complexity: string;
  complexityColor: string;
  title: string;
  lines: TerminalLine[];
}[] = [
  {
    label: "Simple",
    complexity: "간단",
    complexityColor: "#22c55e",
    title: '"NullPointerException 수정해줘"',
    lines: [
      { type: "comment", content: "# Nova 복잡도 자동 판단", delay: 300 },
      { type: "output", content: "Complexity: 1 file, clear bug → Simple", delay: 400 },
      { type: "output", content: "Action: Implement immediately", delay: 200 },
      { type: "blank", content: "", delay: 200 },
      { type: "comment", content: "# 수정 완료 → Evaluator Lite 실행", delay: 600 },
      { type: "command", content: "/nova:review src/auth/user.ts --fast" },
      { type: "blank", content: "", delay: 100 },
      { type: "output", content: "Evaluator [LITE] — adversarial stance", delay: 300 },
      { type: "output", content: "  ✓ Functionality: null check added correctly", delay: 300 },
      { type: "output", content: "  ✓ Craft: proper error handling", delay: 250 },
      { type: "output", content: "  ✓ Boundary: tested with null, undefined", delay: 250 },
      { type: "blank", content: "", delay: 150 },
      { type: "pass", content: "PASS — commit allowed", delay: 400 },
    ],
  },
  {
    label: "Medium",
    complexity: "보통",
    complexityColor: "#eab308",
    title: '"로그인 API 만들어줘"',
    lines: [
      { type: "comment", content: "# Nova 복잡도 + 위험도 자동 판단", delay: 300 },
      { type: "output", content: "Complexity: Auth domain → escalate → Medium", delay: 400 },
      { type: "output", content: "Action: Plan → Approve → Implement", delay: 200 },
      { type: "blank", content: "", delay: 200 },
      { type: "comment", content: "# CPS Plan 작성 → 승인 대기", delay: 500 },
      { type: "command", content: "/nova:plan login-api" },
      { type: "output", content: "Plan created: docs/plan-login-api.md", delay: 400 },
      { type: "output", content: "[Waiting for approval...]", delay: 600 },
      { type: "output", content: "User: approved", delay: 800 },
      { type: "blank", content: "", delay: 200 },
      { type: "comment", content: "# 구현 후 독립 Evaluator 검증", delay: 400 },
      { type: "command", content: "/nova:review src/auth/ --strict" },
      { type: "blank", content: "", delay: 200 },
      { type: "fail", content: "Hard-Block: jwt_secret_key hardcoded in auth.ts:23", delay: 500 },
      { type: "output", content: "  → Use environment variable: process.env.JWT_SECRET", delay: 300 },
      { type: "warn", content: "Soft-Block: no rate limiting on /api/auth/login", delay: 400 },
      { type: "blank", content: "", delay: 200 },
      { type: "output", content: "Hard-Block found → Stopping. Fix required before commit.", delay: 400 },
    ],
  },
  {
    label: "Complex",
    complexity: "복잡",
    complexityColor: "#ef4444",
    title: '"JWT에서 세션 기반으로 전환해줘"',
    lines: [
      { type: "comment", content: "# Nova 복잡도 자동 판단", delay: 300 },
      { type: "output", content: "Complexity: 11 files, Auth domain → Complex", delay: 400 },
      { type: "output", content: "Action: Plan → Design → Sprint split", delay: 200 },
      { type: "blank", content: "", delay: 300 },
      { type: "command", content: "/nova:plan session-auth" },
      { type: "output", content: "Plan created + Design created", delay: 500 },
      { type: "output", content: "Sprint split: 3 sprints identified", delay: 300 },
      { type: "blank", content: "", delay: 300 },
      { type: "comment", content: "# Sprint 1: 세션 모델 구현 + 검증", delay: 400 },
      { type: "command", content: "/nova:auto sprint-1 --verify-only" },
      { type: "pass", content: "Sprint 1 PASS — SessionModel, SessionStore verified", delay: 600 },
      { type: "blank", content: "", delay: 200 },
      { type: "comment", content: "# Sprint 2: 미들웨어 구현 + 검증", delay: 400 },
      { type: "output", content: "Sprint 2 running...", delay: 400 },
      { type: "pass", content: "Sprint 2 PASS — AuthMiddleware verified", delay: 700 },
      { type: "blank", content: "", delay: 200 },
      { type: "comment", content: "# Sprint 3: 전체 통합 검증", delay: 400 },
      { type: "command", content: "/nova:verify --strict" },
      { type: "pass", content: "PASS — 5/5 dimensions. Gap: none.", delay: 700 },
      { type: "output", content: "NOVA-STATE.md updated", delay: 300 },
    ],
  },
];

export default function DemoSection() {
  const [activeTab, setActiveTab] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    const tStop = setTimeout(() => setIsPlaying(false), 0);
    const tStart = setTimeout(() => setIsPlaying(true), 100);
    return () => {
      clearTimeout(tStop);
      clearTimeout(tStart);
    };
  }, [activeTab]);

  useEffect(() => {
    if (isInView && !isPlaying) {
      const t = setTimeout(() => setIsPlaying(true), 400);
      return () => clearTimeout(t);
    }
  }, [isInView, isPlaying]);

  return (
    <section id="demo" className="py-24 px-4 sm:px-6 bg-[#0d0d15]">
      <div className="max-w-4xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#7c3aed]/30 bg-[#7c3aed]/5 text-xs text-[#a855f7] font-mono mb-4">
            Live Demo
          </div>
          <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-bold text-[#f0f0ff] mb-4">
            실제 Nova 사용 예시
          </h2>
          <p className="text-[#8888aa] max-w-xl mx-auto">
            복잡도별로 Nova가 어떻게 다르게 동작하는지 확인해보세요.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex gap-2 mb-6 bg-[#111118] p-1 rounded-xl border border-[#2a2a3a] w-fit mx-auto">
            {demos.map((demo, i) => (
              <button
                key={i}
                onClick={() => setActiveTab(i)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === i
                    ? "bg-[#1a1a24] text-[#f0f0ff] shadow"
                    : "text-[#8888aa] hover:text-[#f0f0ff]"
                }`}
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ background: demo.complexityColor }}
                />
                {demo.label}
              </button>
            ))}
          </div>

          <div className="mb-4 flex items-center justify-between">
            <div>
              <span
                className="inline-flex items-center gap-1.5 text-xs font-mono px-2 py-0.5 rounded"
                style={{
                  background: `${demos[activeTab].complexityColor}15`,
                  color: demos[activeTab].complexityColor,
                }}
              >
                {demos[activeTab].complexity}
              </span>
              <span className="ml-3 text-sm text-[#8888aa]">
                {demos[activeTab].title}
              </span>
            </div>
            <button
              onClick={() => {
                setIsPlaying(false);
                setTimeout(() => setIsPlaying(true), 50);
              }}
              className="text-xs text-[#8888aa] hover:text-[#f0f0ff] transition-colors flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#2a2a3a] hover:border-[#3a3a5a]"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M1 4v6h6M23 20v-6h-6" />
                <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10M23 14l-4.64 4.36A9 9 0 0 1 3.51 15" />
              </svg>
              Replay
            </button>
          </div>

          <TerminalWindow
            key={activeTab}
            lines={demos[activeTab].lines}
            isPlaying={isPlaying}
            title={`nova — ${demos[activeTab].title}`}
          />
        </motion.div>
      </div>
    </section>
  );
}
