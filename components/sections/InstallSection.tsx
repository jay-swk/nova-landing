"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import CodeBlock from "@/components/ui/CodeBlock";

const installCode = `# Install (30 seconds)
claude plugin marketplace add TeamSPWK/nova
claude plugin install nova@nova-marketplace

# Start
/nova:next   # 다음 할 일 확인`;

const updateCode = `# Update
claude plugin update nova@nova-marketplace

# Remove
claude plugin uninstall nova@nova-marketplace
claude plugin marketplace remove nova-marketplace`;

const features = [
  {
    icon: "⚡",
    label: "30초 설치",
    desc: "두 줄 명령어로 즉시 설치",
  },
  {
    icon: "🔑",
    label: "API 키 불필요",
    desc: "/nova:xv 제외 모든 기능 무료",
  },
  {
    icon: "🔄",
    label: "자동 적용",
    desc: "설치 즉시 모든 대화에 활성화",
  },
  {
    icon: "🛡",
    label: "MIT 라이선스",
    desc: "오픈소스, 상업적 사용 가능",
  },
];

export default function InstallSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="install" className="py-24 px-4 sm:px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-[#0d0d15]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(124,58,237,0.08),transparent)]" />

      <div className="relative max-w-4xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#7c3aed]/30 bg-[#7c3aed]/5 text-xs text-[#a855f7] font-mono mb-4">
            Quick Install
          </div>
          <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-bold text-[#f0f0ff] mb-4">
            30초면 설치 완료
          </h2>
          <p className="text-[#8888aa] max-w-xl mx-auto text-lg">
            두 줄 명령어로 Nova Quality Gate가 모든 Claude Code 세션에 활성화됩니다.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
              className="rounded-xl border border-[#2a2a3a] bg-[#111118] p-4 text-center"
            >
              <div className="text-2xl mb-2">{f.icon}</div>
              <div className="text-[#f0f0ff] text-sm font-semibold mb-1">{f.label}</div>
              <div className="text-[#8888aa] text-xs">{f.desc}</div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-8"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 rounded-full bg-[#7c3aed] flex items-center justify-center text-white text-xs font-bold">
              1
            </div>
            <h3 className="text-[#f0f0ff] font-semibold">Install</h3>
          </div>
          <CodeBlock code={installCode} language="bash" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-10"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 rounded-full bg-[#2a2a3a] flex items-center justify-center text-[#8888aa] text-xs font-bold">
              2
            </div>
            <h3 className="text-[#8888aa] font-semibold text-sm">Update / Remove (optional)</h3>
          </div>
          <CodeBlock code={updateCode} language="bash" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="rounded-2xl border border-[#7c3aed]/30 bg-[#111118] p-6"
        >
          <h3 className="text-[#f0f0ff] font-semibold mb-4 flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8v4M12 16h.01" />
            </svg>
            Requirements
          </h3>
          <ul className="space-y-2 text-sm text-[#8888aa]">
            <li className="flex items-center gap-2">
              <span className="text-[#22c55e]">✓</span>
              <a
                href="https://claude.ai/code"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#a855f7] hover:text-[#7c3aed] transition-colors underline underline-offset-2"
              >
                Claude Code
              </a>
              &nbsp;CLI (필수)
            </li>
            <li className="flex items-center gap-2">
              <span className="text-[#eab308]">○</span>
              OpenAI + Google AI Studio API 키 (선택, <code className="font-mono text-xs bg-[#1a1a24] px-1 rounded">/nova:xv</code> 사용 시만 필요)
            </li>
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
