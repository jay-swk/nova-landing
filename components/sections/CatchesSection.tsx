"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";

const catches = [
  {
    defect: "GET /api/auth/me 엔드포인트 누락",
    type: "설계-구현 갭",
    method: "/nova:gap — 설계 문서 vs 라우트 핸들러 diff",
    icon: "📄",
  },
  {
    defect: "비밀번호 평문 저장",
    type: "보안",
    method: "설계는 bcrypt 요구, 코드에 해싱 없음 → Hard-Block",
    icon: "🔒",
  },
  {
    defect: "이메일 중복 체크 누락 (409 미처리)",
    type: "검증 계약 불이행",
    method: "설계에 409 명시, 코드에 처리 없음",
    icon: "⚠️",
  },
  {
    defect: "JWT 시크릿 키 하드코딩",
    type: "보안 패턴",
    method: "정적 분석: 문자열 리터럴 탐지 → Hard-Block",
    icon: "🔑",
  },
];

export default function CatchesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-16 px-4 sm:px-6 bg-[#0d0d15]">
      <div className="max-w-5xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="rounded-2xl border border-[#ef4444]/20 bg-[#111118] overflow-hidden"
        >
          <div className="px-6 py-5 bg-[#ef4444]/5 border-b border-[#ef4444]/20 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#ef4444]/15 flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2">
                <path d="M9 12l2 2 4-4M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z" />
              </svg>
            </div>
            <div>
              <h3 className="text-[#f0f0ff] font-semibold">Nova가 잡아내는 결함</h3>
              <p className="text-xs text-[#8888aa]">CI에서 의도적 결함 코드로 자가 검증 테스트 실행</p>
            </div>
          </div>

          <div className="divide-y divide-[#2a2a3a]">
            {catches.map((c, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
                className="grid grid-cols-1 sm:grid-cols-[2fr_1fr_2fr] gap-3 px-6 py-4 hover:bg-[#1a1a24] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">{c.icon}</span>
                  <span className="text-sm text-[#f0f0ff] font-mono">{c.defect}</span>
                </div>
                <div>
                  <span className="inline-flex px-2 py-0.5 rounded text-xs font-mono bg-[#ef4444]/10 text-[#ef4444]">
                    {c.type}
                  </span>
                </div>
                <div className="text-xs text-[#8888aa] sm:text-right">{c.method}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
