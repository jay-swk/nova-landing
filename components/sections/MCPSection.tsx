"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import CodeBlock from "@/components/ui/CodeBlock";

const tools = [
  {
    name: "get_rules",
    desc: "Nova 규칙 조회",
    detail: "전체 또는 섹션별(§1~§9) 규칙 반환",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
        <rect x="9" y="3" width="6" height="4" rx="1" />
      </svg>
    ),
  },
  {
    name: "get_commands",
    desc: "커맨드 목록 조회",
    detail: "13개 슬래시 커맨드와 설명",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polyline points="4 17 10 11 4 5" />
        <line x1="12" y1="19" x2="20" y2="19" />
      </svg>
    ),
  },
  {
    name: "get_state",
    desc: "프로젝트 상태 조회",
    detail: "지정 경로의 NOVA-STATE.md 읽기",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
      </svg>
    ),
  },
  {
    name: "verify",
    desc: "검증 체크리스트",
    detail: "Lite/Standard/Full 강도별 체크리스트",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M9 11l3 3L22 4" />
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
      </svg>
    ),
  },
  {
    name: "orchestrate",
    desc: "에이전트 편성 가이드",
    detail: "복잡도별 최적 에이전트 구성 제안",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    ),
  },
  {
    name: "create_plan",
    desc: "CPS Plan 템플릿 생성",
    detail: "주제를 입력하면 Plan 초안 반환",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="12" y1="18" x2="12" y2="12" />
        <line x1="9" y1="15" x2="15" y2="15" />
      </svg>
    ),
  },
];

const setupCode = `# Nova 플러그인 설치 시 MCP 서버도 함께 포함됩니다.
# 별도 설정 없이 바로 사용 가능합니다.

claude plugin marketplace add TeamSPWK/nova
claude plugin install nova@nova-marketplace

# MCP 도구 확인
# Claude Code 세션에서 자동으로 사용 가능`;

export default function MCPSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="mcp" className="py-24 px-4 sm:px-6 bg-[#0a0a0f]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#2563eb]/30 bg-[#2563eb]/5 text-xs text-[#60a5fa] font-mono mb-4">
            MCP Server
          </div>
          <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-bold text-[#f0f0ff] mb-4">
            어디서든 Nova 규칙에 접근
          </h2>
          <p className="text-[#8888aa] max-w-2xl mx-auto text-lg text-balance">
            MCP(Model Context Protocol) 서버로 Nova의 규칙과 도구를 어느 Claude Code 세션에서든 사용할 수 있습니다.
            Nova가 설치되지 않은 프로젝트에서도 동작합니다.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-[#f0f0ff] font-semibold text-lg mb-2">
              MCP가 뭔가요?
            </h3>
            <p className="text-[#8888aa] text-sm leading-relaxed mb-6">
              MCP(Model Context Protocol)는 AI 모델이 외부 도구에 접근하는 표준 프로토콜입니다.
              Nova의 MCP 서버는 로컬에서 실행되며, Claude Code가 Nova의 규칙·상태·검증 도구를 직접 호출할 수 있게 합니다.
              API 호출이나 외부 서버 연결 없이, 로컬 파일만 읽습니다.
            </p>

            <h3 className="text-[#f0f0ff] font-semibold text-lg mb-2">
              어떻게 동작하나요?
            </h3>
            <div className="rounded-xl border border-[#2a2a3a] bg-[#111118] p-5 font-mono text-sm">
              <div className="flex items-center gap-3 text-[#8888aa] mb-3">
                <span className="text-[#f0f0ff]">어느 프로젝트든</span>
                <span className="text-[#444466]">→</span>
                <span className="text-[#f0f0ff]">Claude Code</span>
                <span className="text-[#444466]">→</span>
                <span className="text-[#a855f7]">Nova MCP</span>
              </div>
              <div className="border-t border-[#2a2a3a] pt-3 space-y-1.5 text-xs">
                <div><span className="text-[#60a5fa]">get_rules()</span> <span className="text-[#444466]">→</span> <span className="text-[#8888aa]">Nova 규칙 전문</span></div>
                <div><span className="text-[#60a5fa]">get_state()</span> <span className="text-[#444466]">→</span> <span className="text-[#8888aa]">NOVA-STATE.md</span></div>
                <div><span className="text-[#60a5fa]">verify()</span> <span className="text-[#444466]">→</span> <span className="text-[#8888aa]">검증 체크리스트</span></div>
                <div><span className="text-[#60a5fa]">orchestrate()</span> <span className="text-[#444466]">→</span> <span className="text-[#8888aa]">에이전트 편성 가이드</span></div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-[#f0f0ff] font-semibold text-lg mb-4">
              제공 도구 (6개)
            </h3>
            <div className="space-y-3">
              {tools.map((tool, i) => (
                <motion.div
                  key={tool.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.3, delay: 0.4 + i * 0.06 }}
                  className="flex items-start gap-3 rounded-lg border border-[#2a2a3a] bg-[#111118] p-3 hover:border-[#3a3a5a] transition-colors"
                >
                  <div className="mt-0.5 text-[#60a5fa] shrink-0">{tool.icon}</div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <code className="text-[#f0f0ff] text-sm font-mono font-semibold">{tool.name}</code>
                      <span className="text-xs text-[#8888aa]">{tool.desc}</span>
                    </div>
                    <p className="text-xs text-[#444466] mt-0.5">{tool.detail}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="max-w-2xl mx-auto"
        >
          <CodeBlock code={setupCode} language="bash" />
          <p className="text-center text-xs text-[#444466] mt-3">
            플러그인 설치만으로 MCP 서버가 자동 활성화됩니다. 별도 빌드나 설정이 필요 없습니다.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
