"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import CodeBlock from "@/components/ui/CodeBlock";

const toggleCode = `# 게이트만 남기고 나머지 훅은 오케스트레이터에 양보 (한 번만)
bash scripts/nova-coexist.sh on

# 되돌리기 — full Nova 복귀
bash scripts/nova-coexist.sh off

# 현재 상태 확인
bash scripts/nova-coexist.sh status`;

// 역할 분담 — 어느 쪽이 무엇을 담당하는가 (대체가 아니라 공존)
const roles = [
  { concern: "빠른 생성 · 병렬 에이전트 실행", velocity: true, nova: false },
  { concern: "세션 오케스트레이션 · 자동 파이프라인", velocity: true, nova: false },
  { concern: "커밋 전 파일 바인딩 하드 게이트", velocity: false, nova: true },
  { concern: "검증 안 된 변경을 커밋에서 차단", velocity: false, nova: true },
  { concern: "감사 가능한 상태 · 결정 기록", velocity: false, nova: true },
];

export default function CoexistSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="coexist" className="py-24 px-4 sm:px-6 bg-[#0d0d15]">
      <div className="max-w-5xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#22c55e]/30 bg-[#22c55e]/5 text-xs text-[#22c55e] font-mono mb-4">
            Coexist · v5.53.0
          </div>
          <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-bold text-[#f0f0ff] mb-4 leading-tight">
            오케스트레이터를 바꾸지 않아도 된다
          </h2>
          <p className="text-[#8888aa] max-w-2xl mx-auto text-lg leading-relaxed">
            Nova는{" "}
            <a
              href="https://github.com/Yeachan-Heo/oh-my-claudecode"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#a855f7] hover:text-[#7c3aed] transition-colors underline underline-offset-2"
            >
              oh-my-claudecode(OMC)
            </a>{" "}
            같은 velocity 오케스트레이터의 대체재가 아닙니다. 같이 씁니다 —{" "}
            <span className="text-[#f0f0ff]">빠른 실행은 그쪽에 맡기고, Nova는 커밋 전 안전벨트만 남깁니다.</span>
          </p>
        </motion.div>

        {/* 역할 분담 표 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="rounded-2xl border border-[#2a2a3a] bg-[#111118] overflow-hidden mb-6"
        >
          <div className="grid grid-cols-[1fr_auto_auto] sm:grid-cols-[1fr_140px_140px] items-center gap-3 px-5 py-3 border-b border-[#2a2a3a] text-xs font-mono text-[#8080b0]">
            <span>역할 분담 (공존 셋업)</span>
            <span className="text-center text-[#2563eb]">Velocity 툴</span>
            <span className="text-center text-[#a855f7]">Nova</span>
          </div>
          <div className="divide-y divide-[#2a2a3a]">
            {roles.map((r) => (
              <div
                key={r.concern}
                className="grid grid-cols-[1fr_auto_auto] sm:grid-cols-[1fr_140px_140px] items-center gap-3 px-5 py-3.5"
              >
                <span className="text-sm text-[#f0f0ff]">{r.concern}</span>
                <span className="text-center">
                  {r.velocity ? (
                    <span className="text-[#2563eb] text-lg" aria-label="velocity 툴 담당">●</span>
                  ) : (
                    <span className="text-[#2a2a3a]" aria-label="해당 없음">·</span>
                  )}
                </span>
                <span className="text-center">
                  {r.nova ? (
                    <span className="text-[#a855f7] text-lg" aria-label="Nova 담당">●</span>
                  ) : (
                    <span className="text-[#2a2a3a]" aria-label="해당 없음">·</span>
                  )}
                </span>
              </div>
            ))}
          </div>
          <div className="px-5 py-3.5 border-t border-[#2a2a3a] bg-[#0d0d15] text-sm text-[#8888aa]">
            <span className="text-[#22c55e] font-mono mr-1.5">→</span>
            velocity 툴로 <span className="text-[#f0f0ff]">빠르게 만들고</span>, Nova 게이트로{" "}
            <span className="text-[#f0f0ff]">검증 안 된 커밋을 잡는다.</span>
          </div>
        </motion.div>

        {/* NOVA_COEXIST 토글 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="rounded-2xl border border-[#7c3aed]/30 bg-[#111118] p-6"
        >
          <h3 className="text-[#f0f0ff] font-semibold mb-2 flex items-center gap-2">
            <code className="font-mono text-sm bg-[#1a1a24] px-2 py-0.5 rounded text-[#a855f7]">NOVA_COEXIST</code>
            게이트만 남기는 공존 모드
          </h3>
          <p className="text-sm text-[#8888aa] leading-relaxed mb-4">
            오케스트레이터와 Nova를 같이 켜면 SessionStart·PreToolUse·Stop 훅이 양쪽에서 쌓입니다.
            공존 모드는 Nova의 고유 가치인 <span className="text-[#f0f0ff]">커밋 게이트만 유지</span>하고,
            규칙 주입·per-tool 관찰성·stop 훅은 끕니다.
          </p>
          <CodeBlock code={toggleCode} language="bash" />
          <p className="text-xs text-[#8080b0] mt-3">
            <span className="text-[#eab308]">!</span> 적용은 새 Claude Code 세션부터 — 토글 후 재시작하세요.
          </p>
          <div className="flex flex-wrap gap-2 mt-4">
            {[
              "완전 opt-in · 기본은 full Nova",
              "안 켜면 기존 사용자/팀원 영향 0",
              "프로젝트별 토글 (--project)",
            ].map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#2a2a3a] bg-[#0d0d15] text-xs text-[#8888aa] font-mono"
              >
                <span className="text-[#22c55e]">✓</span>
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
