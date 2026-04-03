"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import Accordion from "@/components/ui/Accordion";

const faqItems = [
  {
    question: "Nova를 쓰지 말아야 할 때는 언제인가요?",
    answer:
      "한 줄 오타 수정, 버전 범프 같은 단순 작업에는 CPS가 필요 없습니다. 스택 트레이스가 원인을 직접 가리키는 명확한 버그 수정, 버릴 프로토타입 제작, 30분 이내로 끝나는 작업도 Nova 없이 바로 진행하세요. 기준: 변경 사항 전체를 머릿속에 담을 수 있으면 Nova가 필요 없습니다.",
  },
  {
    question: "/nova:xv 멀티 AI 합의가 틀릴 수 있나요?",
    answer:
      "그렇습니다. Claude, GPT, Gemini는 학습 데이터를 상당 부분 공유합니다. 세 모델이 동의해도 공유된 맹점일 수 있습니다. /nova:xv는 단일 판단보다 신뢰할 수 있는 다관점 참고 자료를 제공하지만, 최종 결정은 항상 사람의 몫입니다.",
  },
  {
    question: "AI 오케스트레이터와 Nova는 어떻게 함께 쓰나요?",
    answer:
      "Nova는 Quality Gate — 생성이 아닌 검증에 집중합니다. 오케스트레이터(또는 Claude Code 자체)가 코드를 만들고, Nova가 독립 에이전트로 검증합니다. Claude Code의 하네스 레이어를 통해 루프 안의 검문소 역할을 합니다. 오케스트레이션 도구와 충돌하지 않습니다.",
  },
  {
    question: "MCP 서버는 뭔가요?",
    answer:
      "MCP(Model Context Protocol) 서버는 Nova의 규칙과 도구를 어느 Claude Code 세션에서든 사용할 수 있게 해주는 로컬 서버입니다. Nova 플러그인을 설치하면 자동으로 포함됩니다. Nova가 설치되지 않은 다른 프로젝트에서도 Nova의 규칙을 조회하거나, 검증 체크리스트를 받거나, 에이전트 편성 가이드를 참고할 수 있습니다. 로컬에서만 동작하며 외부 API 호출은 없습니다.",
  },
  {
    question: "\"하네스 엔지니어링\"이란 무엇인가요?",
    answer:
      "프롬프트 엔지니어링이 모델이 \"무엇을 말하는지\"를 다룬다면, 하네스 엔지니어링은 모델이 \"언제, 어떤 규칙으로, 어떤 도구로 실행되는지\"를 다룹니다. Nova는 훅, 플러그인, 커맨드, 에이전트를 활용해 AI 행동을 통제하는 하네스 엔지니어링 도구입니다. 모델이 아는 것을 바꾸는 게 아니라, 실행 규칙과 구조를 바꿉니다.",
  },
];

export default function FAQSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="faq" className="py-24 px-4 sm:px-6 bg-[#0a0a0f]">
      <div className="max-w-3xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#7c3aed]/30 bg-[#7c3aed]/5 text-xs text-[#a855f7] font-mono mb-4">
            FAQ
          </div>
          <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-bold text-[#f0f0ff] mb-4">
            자주 묻는 질문
          </h2>
          <p className="text-[#8888aa]">
            Nova에 대해 더 궁금한 점은{" "}
            <a
              href="https://github.com/TeamSPWK/nova"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#a855f7] hover:text-[#7c3aed] transition-colors"
            >
              GitHub
            </a>
            에서 확인하세요.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Accordion items={faqItems} />
        </motion.div>
      </div>
    </section>
  );
}
