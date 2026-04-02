"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface AccordionItem {
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
}

export default function Accordion({ items }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <div
          key={index}
          className={`rounded-xl border transition-colors overflow-hidden ${
            openIndex === index
              ? "border-[#7c3aed]/50 bg-[#111118]"
              : "border-[#2a2a3a] bg-[#0d0d15] hover:border-[#3a3a5a]"
          }`}
        >
          <button
            className="w-full px-6 py-4 text-left flex items-center justify-between gap-4"
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            aria-expanded={openIndex === index}
          >
            <span className="text-[#f0f0ff] font-medium text-sm sm:text-base">
              {item.question}
            </span>
            <motion.div
              animate={{ rotate: openIndex === index ? 45 : 0 }}
              transition={{ duration: 0.2 }}
              className="shrink-0 w-6 h-6 rounded-full border border-[#3a3a5a] flex items-center justify-center text-[#8888aa]"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 5v14M5 12h14" />
              </svg>
            </motion.div>
          </button>

          <AnimatePresence initial={false}>
            {openIndex === index && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
              >
                <div className="px-6 pb-5 text-sm text-[#8888aa] leading-relaxed border-t border-[#2a2a3a] pt-4">
                  {item.answer}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
