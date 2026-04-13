"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { scenarios } from "./scenarios";
import LevelSelector from "./LevelSelector";
import Walkthrough from "./Walkthrough";

export default function GuidePage() {
  const [activeLevel, setActiveLevel] = useState(1);
  const activeScenario = scenarios.find((s) => s.level === activeLevel)!;

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      {/* Header */}
      <div className="border-b border-[#2a2a3a] bg-[#0a0a0f]/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <a
            href="/nova-landing/"
            className="flex items-center gap-2 text-[#8888aa] hover:text-[#f0f0ff] transition-colors"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            <span className="text-sm">Nova</span>
          </a>
          <span className="text-xs text-[#444466] font-mono">
            Interactive Guide
          </span>
        </div>
      </div>

      {/* Hero */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#7c3aed]/30 bg-[#7c3aed]/5 text-xs text-[#a855f7] font-mono mb-6">
              Interactive Walkthrough
            </div>
            <h1 className="text-[clamp(1.8rem,4vw,3rem)] font-bold text-[#f0f0ff] mb-4">
              Nova를 처음 써보세요
            </h1>
            <p className="text-[#8888aa] max-w-2xl mx-auto mb-2 text-balance">
              커맨드를 외울 필요 없습니다.{" "}
              <span className="text-[#a855f7]">자연어로 요청</span>하면 Nova가
              알아서 판단하고 실행합니다.
            </p>
            <p className="text-sm text-[#444466] max-w-xl mx-auto mb-10">
              난이도를 선택하고, 각 단계를 클릭하며 Nova의 동작을 체험해보세요.
            </p>
          </motion.div>

          <LevelSelector
            scenarios={scenarios}
            activeLevel={activeLevel}
            onSelect={setActiveLevel}
          />
        </div>
      </section>

      {/* Walkthrough */}
      <section className="pb-24 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div
            key={activeLevel}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Walkthrough scenario={activeScenario} />
          </motion.div>

          {/* Tip box */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 p-4 rounded-xl border border-[#2a2a3a] bg-[#111118]"
          >
            <div className="text-xs text-[#a855f7] font-mono mb-2">
              TIP
            </div>
            <p className="text-sm text-[#8888aa] leading-relaxed">
              위 모든 과정에서 사용자는{" "}
              <span className="text-[#f0f0ff]">자연어로만 대화</span>했습니다.
              Nova가 복잡도를 판단하고, Plan을 작성하고, 검증을 실행하는 것은 모두{" "}
              <span className="text-[#f0f0ff]">자동</span>입니다.
              <br />
              <br />
              파워 유저라면{" "}
              <code className="px-1.5 py-0.5 rounded bg-[#1a1a24] text-[#a855f7] text-xs font-mono">
                /nova:review --strict
              </code>{" "}
              같은 커맨드로 직접 제어할 수도 있습니다.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
